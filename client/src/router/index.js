import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import AnimalShow from '@/components/Animal/ShowAnimal';
import AnimalIndex from '@/components/Animal/index'
import AnimalCreate from '@/components/Animal/CreateAnimal'
import AnimalEdit from '@/components/Animal/EditAnimal'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Animal',
      name: 'Animal',
      component: AnimalIndex
  },
  {
      path: '/Animal/create',
      name: 'Animal-create',
      component: AnimalCreate
  },
  {
      path: '/Animal/edit/:AnimalId',
      name: 'Animal-edit',
      component: AnimalEdit
  },
  {
      path: '/Animal/:AnimalId',
      name: 'Animal-show',
      component: AnimalShow
  },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
  ]
})
