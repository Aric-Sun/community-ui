// 页面懒加载
const Data = () => import("views/data/Data");
const Department = () => import('views/department/Department');
const Employee = () => import('views/employee/Employee');
const FlowDetection = () => import('views/flowdetection/FlowDetection');
const Notice = () => import('views/notice/Notice');
const Owner = () => import('views/owner/Owner');
const Property = () => import('views/property/Property');
const Login = () => import('views/Login.vue');
const UserPassage = () => import('views/user-passage/UserPassage');
const UserQRCode = () => import('views/user-qrcode/UserQRCode');
const Manager = () => import('views/manager/manager.vue');

// 路径配置
const routes = [
  {
    path: "",
    redirect: "",
  },
  {
    path: "/department",
    component: Department,
  },
  {
    path: "/employee",
    component: Employee,
  },
  {
    path: "/flowdetection",
    component: FlowDetection,
  },
  {
    path: "/notice",
    component: Notice,
  },
  {
    path: "/owner",
    component: Owner,
  },
  {
    path: "/property",
    component: Property,
  },
  {
    path: "/data",
    component: Data,
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/user/passages",
    component: UserPassage
  },
  {
    path: '/user/qrcode',
    component: UserQRCode
  },
  {
    path: "/manager",
    component: Manager,
  },
];

export default routes;