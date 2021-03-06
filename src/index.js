import FullPage from "./libs/Fullpage";
import Animate from "./libs/Animate";

let fullpage =  {
	install: (Vue, options) => {
		Vue.directive('fullpage', {
			inserted: (el, binding, vnode)=>{
				var opts = binding.value || {}

				el.$fullpage = new FullPage(el, opts, vnode);

				el.$fullpage.$update = function(){
					Vue.nextTick(function(){
						el.$fullpage.update()
					})
				}
			},
			componentUpdated: (el, binding, vnode)=>{
				var opts = binding.value || {};
				var that  = el.$fullpage;
				that.setOptions(opts);
			},
			unbind(el){
				el.$fullpage.destroy()
			}
		})

		Vue.directive('animate', {
			inserted: (el, binding, vnode)=>{
				let opts = binding || {};
				el.$animate = new Animate(el, opts, vnode);				
			}
		})
	}
}

if(window.Vue){
	window.VueFullpage = fullpage
	Vue.use(fullpage)
}

export default fullpage;
