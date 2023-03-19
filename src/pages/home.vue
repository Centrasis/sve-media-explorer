<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-title v-if="user !== undefined" sliding>Willkommen {{ user.getName() }}</f7-nav-title>
      <f7-nav-title v-else sliding>Not logged in</f7-nav-title>
      <f7-nav-right>
        <f7-link iconF7="folder_badge_plus" tooltip="Neue Dokumentengruppe erstellen"></f7-link>
        <f7-link iconF7="qrcode_viewfinder" tooltip="Gruppe mit QR Code beitreten" onClick={this.joinGroup.bind(this)}></f7-link>
        <f7-link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large v-if="user !== undefined">Willkommen {{ user.getName() }}</f7-nav-title-large>
      <f7-nav-title-large v-else>Not logged in</f7-nav-title-large>
      <f7-searchbar
        className="searchbar-demo"
        expandable
        searchContainer=".search-list"
        searchIn=".item-title"
      ></f7-searchbar>
    </f7-navbar>
    <!-- Toolbar-->
    <f7-toolbar bottom>
    </f7-toolbar>
    <!-- Page content-->
    <f7-block strong>
      <p>Willkommen im neuen SnowVision-Entertainment online Portal!</p>
      <p>Falls du es noch nicht getan hast, installiere diese App auf deinem Handy. Unter Apples iOS geht dies über die "Teilen" Funktion in der Safari Werkzeugleiste unten am Bildschirm. Das installieren der Webapp erlaubt es, weitere Funktionen zu nutzen.</p>
    </f7-block>
    <f7-block-title large>Deine Urlaubsgruppen</f7-block-title>
    <f7-list className="search-list searchbar-found">
      <f7-list-item v-for="g in groups" :title="g.getName()" :id="g.getID()" :key="g.getID()" :link="getGroupLink(g)"></f7-list-item>
    </f7-list>

    <f7-block strong>
      <f7-row>
      <f7-col>
        <f7-link href="/settings/" iconF7="gear" tooltip="Einstellungen">&nbsp;Einstellungen</f7-link>
      </f7-col>
      <f7-col v-if="!deviceInfo.standalone && deviceInfo.mobile">
        <f7-link href="/install/" iconF7="square_arrow_down">&nbsp;App installieren</f7-link>
      </f7-col>
      <f7-col>
        <f7-link href="/about/">Über die SVE-API</f7-link>
      </f7-col>
      <f7-col>
        <f7-link href="#" color="red" textColor="red" @click="logout">Logout</f7-link>
      </f7-col>
    </f7-row>
    </f7-block>
  </f7-page>
</template>

<script lang="ts">
    import { onMounted } from 'vue';
    import { f7ready } from 'framework7-vue';
    import { useStore } from 'framework7-vue';
    import store from '../js/store';
    import { getDevice } from 'framework7';
    import { SVEAccount, SVEGroup } from 'svebaselib';

    export default {
        setup() {
            const user: SVEAccount = useStore('user');
            const groups: SVEGroup[] = useStore('groups');

            onMounted(() => {
                f7ready(() => {

                });
            });

            return {
              user,
              groups,
              deviceInfo: {
                standalone: getDevice().standalone,
                mobile: getDevice().ios || getDevice().android,
              },
              logout: () => {
                console.log("Log out!");
                store.dispatch("logout", {});
              },
              getGroupLink: (g: SVEGroup): string => {
                let link = "/group/" + g.getID();
                return link;
              }
            }
        }
    }

</script>