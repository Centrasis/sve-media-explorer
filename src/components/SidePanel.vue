<template>
  <f7-panel right reveal dark>
    <f7-view>
      <f7-page>
        <f7-navbar :title="panelInfo.title"></f7-navbar>
        <f7-block>Right panel content goes here</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>
</template>

<script lang="ts">
    import { onMounted } from 'vue';
    import { f7ready } from 'framework7-vue';
    import { useStore } from 'framework7-vue';
    import { SidePanelInfo } from '../js/store';

    export default {
        setup() {
            const panelInfo: SidePanelInfo = useStore('sidePanelInfo');

            onMounted(() => {
                f7ready(() => {

                });
            });

            return {
                panelInfo
            }
        }
    }

</script>