<template>
    <f7-login-screen v-model:opened="isLoggedOut">
        <f7-page login-screen>
            <f7-login-screen-title>Login</f7-login-screen-title>
            <f7-list form>
                <f7-list-input
                label="Username"
                type="text"
                placeholder="Your username"
                :value="username"
                @input="username = $event.target.value"
                ></f7-list-input>
                <f7-list-input
                label="Password"
                type="password"
                placeholder="Your password"
                :value="password"
                @input="password = $event.target.value"
                ></f7-list-input>
            </f7-list>
            <f7-list>
                <f7-list-button @click="() => signin(username, password)">Anmelden</f7-list-button>
                <f7-block-footer>
                    <f7-button>Registrieren</f7-button>
                </f7-block-footer>
            </f7-list>
        </f7-page>
    </f7-login-screen>
  </template>

<script lang="ts">
    import { useStore } from 'framework7-vue';
    import { BasicUserLoginInfo, SVEAccount } from 'svebaselib';
    import store from '../js/store';

    export default {
      data() {
        const user: SVEAccount = useStore('user');
        const isLoggedIn: boolean = useStore('isLoggedIn');
        const isLoggedOut: boolean = useStore('isLoggedOut');

        return {
            user,
            isLoggedOut,
            isLoggedIn,
            username: '',
            password: '',
            signin: (usr: string, pw: string) => {
                store.dispatch("login", { 
                    info: <BasicUserLoginInfo>{
                        name: usr,
                        pass: pw
                    }
                });
            }
        }
      }
    };
</script>