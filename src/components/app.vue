<script lang="ts" setup>
  import { ref } from 'vue'

  import Login from '../pages/Login.vue';
  import SidePanel from './SidePanel.vue';

  import routes from '../js/routes.js';
  import store from '../js/store';

  import {SVESystemInfo} from 'svebaselib';

  SVESystemInfo.getInstance().sources.sveService = window.location.hostname.replace("www.", "media.").replace("sve.", "media.");
  SVESystemInfo.getInstance().sources.authService = window.location.hostname.replace("www.", "accounts.").replace("sve.", "accounts.") + "/auth";
  SVESystemInfo.getInstance().sources.accountService = window.location.hostname.replace("www.", "accounts.").replace("sve.", "accounts.");
  SVESystemInfo.getInstance().sources.gameService = window.location.hostname.replace("www.", "games.").replace("sve.", "games.");
  SVESystemInfo.getInstance().sources.aiService = window.location.hostname.replace("www.", "ai.").replace("sve.", "ai.");

  try {
    if (process !== undefined) {
      SVESystemInfo.getInstance().sources.sveService = process.env.sveAPI;
      SVESystemInfo.getInstance().sources.authService = process.env.authAPI;
      SVESystemInfo.getInstance().sources.accountService = process.env.accountsAPI;
      SVESystemInfo.getInstance().sources.gameService = process.env.gameAPI;
      SVESystemInfo.getInstance().sources.aiService = process.env.aiAPI;
    }
  } catch {

  }

  const f7params = ref({
    name: 'sve-online', // App name
    theme: 'auto', // Automatic theme detection
    id: "sve.felixlehner.de",
    version: "1.0.0",
    iosTranslucentBars: true,
    notification: {
      title: 'SVE Media',
      closeTimeout: 3000,
    },
    // App store
    store: store,
    // App routes
    routes: routes,
    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV ==='production' ? {
      path: '/service-worker.js',
    } : {},
  });
</script>

<template>
  <f7-app v-bind="f7params" dark>

  <SidePanel></SidePanel>

  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>

  <Login></Login>

  </f7-app>
</template>
