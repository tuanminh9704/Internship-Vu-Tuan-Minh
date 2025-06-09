import { type ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export async function loader() {
  return {
    message:
      "This is a webhook endpoint, please send a POST request from Shopify",
  };
}

interface Customer {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  customerIdShopify: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { payload, session, topic, shop } =
      await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    if (session) {
      const customerIdShopify = String(payload.customer.id);
      const customerExisted = await db.customer.findFirst({
        where: {
          customerIdShopify: customerIdShopify.toString(),
        },
      });

      const pointConfig = await db.pointConfig.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!pointConfig) {
        throw new Error("Point config is missing!");
      }

      if (!customerExisted) {
        const newCustomer: Customer = {
          email: payload.customer.email || "",
          name: payload.customer.default_address.name || "",
          firstName: payload.customer.first_name || "",
          lastName: payload.customer.last_name || "",
          customerIdShopify: payload.customer.id.toString(),
        };
        const purchasedProducts = payload.line_items;
        const totalPrice: number = purchasedProducts.reduce(
          (total: number, item: any) => total += Number(item.price), 0
        );

        const totalPoints = Math.round(totalPrice / pointConfig?.earnRate);

        await db.customer.create({
          data: {
            ...newCustomer,
            points: {
              create: {
                totalPoints: Number(totalPoints),
              },
            },
            pointLogs: {
              create: {
                change: Number(totalPoints),
              },
            },
          },
        });
      }
      else {
        const purchasedProducts = payload.line_items;
        const totalPrice: number = purchasedProducts.reduce(
          (total: number, item: any) => total += Number(item.price), 0
        );
        const totalPoints = Math.round(totalPrice / pointConfig?.earnRate);

        const totalPointEXisted = await db.point.findFirst({
          where: {
            customerId: customerExisted.id
          }
        })
        const totalPointsExsisted = totalPointEXisted?.totalPoints || 0;

        await db.point.upsert({
          where: {
            customerId: customerExisted.id
          },
          update: {
            totalPoints: totalPointsExsisted + totalPoints
          },
          create: {
            customerId: customerExisted.id,
            totalPoints: totalPoints
          }
        })

        await db.pointLog.create({
          data: {
            customerId: customerExisted.id,
            change: totalPoints,
            reason: 'Ordered'
          }
        })
      }
    }
    return new Response();
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};
