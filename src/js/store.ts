
import { createStore } from 'framework7/lite';
import { SVEAccount, BasicUserLoginInfo, SVEGroup } from 'svebaselib';


export interface PanelSubMenuItem {
  caption: string,
  icon: string,
  onClick: () => void;
  color?: string;
}


export interface SidePanelInfo {
  title: string;
  subMenuItems: PanelSubMenuItem[];
}


const store = createStore({
  state: {
    user: <SVEAccount>undefined,
    sidePanelInfo: [<SidePanelInfo>{
      title: "SVE-Media-System",
      subMenuItems: []
    }],
    groups: <SVEGroup[]>[]
  },
  getters: {
    user({ state }): SVEAccount {
      return state.user;
    },
    groups({ state }) {
      return state.groups;
    },
    isLoggedIn({ state }) {
      return state.user !== undefined;
    },
    isLoggedOut({ state }) {
      return state.user == undefined;
    },
    sidePanelInfo({ state }): SidePanelInfo {
      if (state.sidePanelInfo.length > 0) {
        return state.sidePanelInfo[state.sidePanelInfo.length-1];
      } else {
        return <SidePanelInfo>{
          title: "Empty Menue",
          subMenuItems: []
        }
      }
    }
  },
  actions: {
    login({ state }, { info }) {
      console.log("Issue login for user: " + (<BasicUserLoginInfo>info).name);
      new SVEAccount(info, (account) => {
        console.log("Got user info!");
        state.user = account;
        store.dispatch("fetchGroups", {});
      })
    },
    logout({ state }, {}) {
      state.user = undefined;
    },
    fetchGroups({ state }, {}) {
      SVEGroup.getGroupsOf(state.user).then(groups => state.groups = groups);
    },
    pushSidePanelInfo({ state }, { info }) {
      state.sidePanelInfo = [...state.sidePanelInfo, info];
    }
  },
})
export default store;
