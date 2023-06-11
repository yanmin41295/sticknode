import browser from "webextension-polyfill";

export default async function renderContent(
    cssPaths: string[],
    render: (appRoot: HTMLElement) => void
) {
    const appRoot = document.createElement("div");
    appRoot.setAttribute("id", "appRoot")


    document.body.appendChild(appRoot);
    console.log("render")
    render(appRoot);
}
