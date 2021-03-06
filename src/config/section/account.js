// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

export default {
  name: 'account',
  title: 'label.accounts',
  icon: 'team',
  permission: ['listAccounts'],
  columns: ['name', 'state', 'rolename', 'roletype', 'domainpath'],
  details: ['name', 'id', 'rolename', 'roletype', 'domainpath', 'networkdomain', 'iptotal', 'vmtotal', 'volumetotal', 'receivedbytes', 'sentbytes', 'vmlimit', 'iplimit', 'volumelimit', 'snapshotlimit', 'templatelimit', 'vpclimit', 'cpulimit', 'memorylimit', 'networklimit', 'primarystoragelimit', 'secondarystoragelimit'],
  related: [{
    name: 'accountuser',
    title: 'label.users',
    param: 'account'
  }],
  tabs: [
    {
      name: 'details',
      component: () => import('@/components/view/DetailsTab.vue')
    },
    {
      name: 'limits',
      show: (record, route, user) => { return ['Admin'].includes(user.roletype) },
      component: () => import('@/components/view/ResourceLimitTab.vue')
    },
    {
      name: 'certificate',
      component: () => import('@/views/iam/SSLCertificateTab.vue')
    },
    {
      name: 'settings',
      component: () => import('@/components/view/SettingsTab.vue'),
      show: (record, route, user) => { return ['Admin'].includes(user.roletype) }
    }
  ],
  actions: [
    {
      api: 'createAccount',
      icon: 'plus',
      label: 'label.add.account',
      listView: true,
      args: ['username', 'password', 'email', 'firstname', 'lastname', 'domainid', 'account', 'roleid', 'timezone', 'networkdomain']
    },
    {
      api: 'ldapCreateAccount',
      icon: 'user-add',
      label: 'label.add.ldap.account',
      listView: true,
      popup: true,
      show: (record, store) => {
        return store.isLdapEnabled
      },
      component: () => import('@/views/iam/AddLdapAccount.vue')
    },
    {
      api: 'updateAccount',
      icon: 'edit',
      label: 'label.action.edit.account',
      dataView: true,
      args: ['newname', 'account', 'domainid', 'networkdomain'],
      mapping: {
        account: {
          value: (record) => { return record.name }
        },
        domainid: {
          value: (record) => { return record.domainid }
        }
      }
    },
    {
      api: 'updateResourceCount',
      icon: 'sync',
      label: 'label.action.update.resource.count',
      message: 'message.update.resource.count',
      dataView: true,
      args: ['account', 'domainid'],
      mapping: {
        account: {
          value: (record) => { return record.name }
        },
        domainid: {
          value: (record) => { return record.domainid }
        }
      }
    },
    {
      api: 'enableAccount',
      icon: 'play-circle',
      label: 'label.action.enable.account',
      message: 'message.enable.account',
      dataView: true,
      show: (record) => { return record.state === 'disabled' || record.state === 'locked' },
      params: { lock: 'false' }
    },
    {
      api: 'disableAccount',
      icon: 'pause-circle',
      label: 'label.action.disable.account',
      message: 'message.disable.account',
      dataView: true,
      show: (record) => { return record.state === 'enabled' },
      args: ['lock'],
      mapping: {
        lock: {
          value: (record) => { return false }
        }
      }
    },
    {
      api: 'disableAccount',
      icon: 'lock',
      label: 'label.action.lock.account',
      message: 'message.lock.account',
      dataView: true,
      show: (record) => { return record.state === 'enabled' },
      args: ['lock'],
      mapping: {
        lock: {
          value: (record) => { return true }
        }
      }
    },
    {
      api: 'uploadSslCert',
      icon: 'safety-certificate',
      label: 'label.add.certificate',
      dataView: true,
      args: ['name', 'certificate', 'privatekey', 'certchain', 'password', 'account', 'domainid'],
      show: (record) => { return record.state === 'enabled' },
      mapping: {
        account: {
          value: (record) => { return record.name }
        },
        domainid: {
          value: (record) => { return record.domainid }
        }
      }
    },
    {
      api: 'deleteAccount',
      icon: 'delete',
      label: 'label.action.delete.account',
      message: 'message.delete.account',
      dataView: true,
      hidden: (record) => { return record.name === 'admin' }
    }
  ]
}
