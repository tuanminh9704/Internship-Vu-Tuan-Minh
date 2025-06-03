export const fomatSelectedOption = (optionsSelected : any) => {
    const fomatOptionsSelected = Object.fromEntries(
        Object.entries(optionsSelected).map(([key, value]) => [
        key,
        (value as string[])[0],
        ]),
    );

    return fomatOptionsSelected;
}