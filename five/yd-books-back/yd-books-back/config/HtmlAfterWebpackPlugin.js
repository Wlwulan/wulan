const pluginName = 'HtmlAfterWebpackPlugin';
const assetsHelp = (data) => {
    let css = [];
    let js = [];
    const dir = {
        js: item => `<script class="lazyload-js" src="${item}"></script>`,
        css: item => `<link class="lazyload-css" rel="stylesheet" href="${item}"></link>`
    }
    for (let jsitem of data.js) {
        js.push(dir.js(jsitem))
    }
    for (let cssitem of data.css) {
        css.push(dir.css(cssitem))
    }
    return {
        js,
        css
    }
}
class HtmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
                //console.log('🍎🍎🍎🍎🍎', htmlPluginData);
                let _html = htmlPluginData.html;
                _html = _html.replace(/components:/g, "../../../components/");
                _html = _html.replace(/common:/g, "../../common/");
                const result = assetsHelp(htmlPluginData.assets);
                _html = _html.replace("<!--injectcss-->", result.css.join(""));
                _html = _html.replace("<!--injectjs-->", result.js.join(""));
                htmlPluginData.html = _html;
            });
        });
    }
}
module.exports = HtmlAfterWebpackPlugin;