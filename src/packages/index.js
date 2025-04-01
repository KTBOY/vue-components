import DrawRect from './DrawRect/index.vue';



 
const components = [DrawRect];
const install = function (App, options) {
  components.forEach((component) => {
    // 这个name是你创建组件的时候要填写好的
    App.component(component.name, component);
  });
};
export default { install }; 
