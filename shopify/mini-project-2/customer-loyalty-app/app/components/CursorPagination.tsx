import { Pagination} from "@shopify/polaris";
import type { PageInfo } from "app/types/pageInfo";

type PageInfoProp = {
    pageInfo: PageInfo
    navigate: any
}

export const CursorPagination = ({pageInfo, navigate} : PageInfoProp) => {
  return (
    <Pagination
      hasPrevious={pageInfo.hasPreviousPage}
      hasNext={pageInfo.hasNextPage}
      onNext={() => {
        const url = new URL(window.location.href);
        url.searchParams.set("after", pageInfo.endCursor);
        url.searchParams.delete("before");
        navigate(url.pathname + "?" + url.searchParams.toString());
      }}
      onPrevious={() => {
        const url = new URL(window.location.href);
        url.searchParams.set("before", pageInfo.startCursor);
        url.searchParams.delete("after");
        navigate(url.pathname + "?" + url.searchParams.toString());
      }}
    />

  );
};
