import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogDetailView from '@/views/BlogDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AdminLoginView from '@/views/admin/AdminLoginView.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminProjectsView from '@/views/admin/AdminProjectsView.vue'
import AdminSkillsView from '@/views/admin/AdminSkillsView.vue'
import AdminExperiencesView from '@/views/admin/AdminExperiencesView.vue'
import AdminEducationsView from '@/views/admin/AdminEducationsView.vue'
import AdminCertificationsView from '@/views/admin/AdminCertificationsView.vue'
import AdminBlogView from '@/views/admin/AdminBlogView.vue'
import AdminMessagesView from '@/views/admin/AdminMessagesView.vue'
import AdminProfileView from '@/views/admin/AdminProfileView.vue'
import AdminHobbiesView from '@/views/admin/AdminHobbiesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: ProjectDetailView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: BlogDetailView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLoginView,
      meta: { guest: true },
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboardView,
        },
        {
          path: 'projects',
          name: 'admin-projects',
          component: AdminProjectsView,
        },
        {
          path: 'skills',
          name: 'admin-skills',
          component: AdminSkillsView,
        },
        {
          path: 'experiences',
          name: 'admin-experiences',
          component: AdminExperiencesView,
        },
        {
          path: 'educations',
          name: 'admin-educations',
          component: AdminEducationsView,
        },
        {
          path: 'certifications',
          name: 'admin-certifications',
          component: AdminCertificationsView,
        },
        {
          path: 'blog',
          name: 'admin-blog',
          component: AdminBlogView,
        },
        {
          path: 'messages',
          name: 'admin-messages',
          component: AdminMessagesView,
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: AdminProfileView,
        },
        {
          path: 'hobbies',
          name: 'admin-hobbies',
          component: AdminHobbiesView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ] as any,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('admin_token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'admin-login' })
  } else if (to.meta.guest && token) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
