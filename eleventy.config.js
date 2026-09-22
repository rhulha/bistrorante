export default function (eleventyConfig) {
    for (const dir of ["css", "js", "img", "audio"]) {
        eleventyConfig.addPassthroughCopy(dir);
    }

    eleventyConfig.addGlobalData("permalink", () => (data) => `${data.page.filePathStem.slice(1)}.html`);

    eleventyConfig.addFilter("euro", (n) => `${n.toFixed(2).replace(".", ",")} €`);

    return {
        htmlTemplateEngine: "njk",
        dir: {
            input: ".",
            includes: "_includes",
            data: "content",
            output: "_site",
        },
    };
}
