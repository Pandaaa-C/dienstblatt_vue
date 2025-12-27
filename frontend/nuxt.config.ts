// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'path';

export default defineNuxtConfig({
    compatibilityDate: '2025-12-27',
    css: ['@/assets/scss/main.scss'],
    app: {
        head: {
            title: 'FIB Dienstblatt',
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: 'https://cdn.discordapp.com/attachments/812860358397526026/1061292973347831868/logo.png',
                },
            ],
        },
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
            },
        ],
    ],
    alias: {
        '@': resolve(__dirname, ''),
        '@shared': resolve(__dirname, '../shared'),
    },
});
