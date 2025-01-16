## vite插件针对项目中的图片懒加载和预加载

>针对项目中的图片的加载的场景，做了预加载的优化策略（不同场景下 prefetch和preload）灵活配置，开发了Vite插件

```ts
import type { Plugin } from 'vite';
//用于快速匹配文件路径的工具库
import fg from 'fast-glob';
interface OptionsParams {
    dir: string;
    attrs: {
        rel: 'prefetch' | 'preload';
    };
}
export const preloadImagePlugin = (options: OptionsParams): Plugin => {
    const { dir, attrs } = options;
    return {
        name: 'vite-plugin-preload',
        transformIndexHtml(html, ctx) {
            const files = fg.sync(dir, {
                cwd: ctx.server?.config.publicDir
            });
            const images = files.map((file) => ctx.server?.config.base + file);
            //生成link标签
            return images.map((href) => {
                return {
                    tag: 'link',
                    attrs: {
                        rel: attrs.rel,
                        as: 'image',
                        href: href
                    }
                };
            });
        }
    };
};
```
```ts
//vite.config.ts
import { defineConfig } from 'vite';
import { preloadImagePlugin } from './plugins/preloadImagePlugin';

export default defineConfig({
    plugins: [
        preloadImagePlugin({
            dir: 'images/*.{png,jpg}', // 匹配 images 目录下的 png 和 jpg 文件
            attrs: {
                rel: 'preload', // 使用 preload
            },
        }),
    ],
});
```