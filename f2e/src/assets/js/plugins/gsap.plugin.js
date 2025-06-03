import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// registerPlugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default gsap;