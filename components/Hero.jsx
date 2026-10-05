"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger,useGSAP);

//order of stats call boxes
const stats=[
    {value:"58%",text:"Increase in pick up point use",row:"top",color:"bg-[#e0f552] text-black"},
    {value:"23%",text:"Decreased in customer phone calls",row:"bottom",color:"bg-[#6cc8ff] text-black"},
    {value:"27%",text:"Increase in pick up point use",row:"top",color:"bg-[#333333] text-white"},
    {value:"40%",text:"Decreased in customer phone calls",row:"bottom",color:"bg-[#fb7328] text-black"},
];

export default function Hero(){
    const root=useRef(null);
    const road=useRef(null);
    const car=useRef(null);

    useGSAP(
        ()=>{
            const W= ()=> road.current.offsetWidth;
            const L= ()=> car.current.offsetHeight;
            const REAR= ()=> L()*0.18;

            //road fade
            gsap.from(".road",{opacity:0,y:40,duration:1,ease:"power3.out"});

            //rotate car.png 
            gsap.set(".car",{xPercent:-50,yPercent:-50,rotate:90});

            //scroll timeline
            const tl=gsap.timeline({
                defaults:{ease:"none"},
                scrollTrigger:{
                    trigger:root.current,
                    start:"top top",
                    end:"+=3000",
                    scrub:1,
                    pin:true,
                    invalidateOnRefresh:true
                },
            });

            tl

            .fromTo(".car",{x:()=> L()/2},{x:()=>W()-REAR()+L()/2,duration:1},0)
            //green animation
            .fromTo(".trail",{scaleX:()=>REAR()/W()},{scaleX:1,duration:1},0)
            //text
            .fromTo(".headline",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:1},0);

            //callboxes
            stats.forEach((_,i)=>{
                tl.fromTo(
                    `.stat-${i}`,
                    {opacity:0,y:30},
                    {opacity:1,y:0,duration:0.12,ease:"power2.out"},
                    0.4+i*0.15
                );
            });


        },
        {scope:root}
    );
    return(
        <section
            ref={root}
            className="relative flex h-screen w-full items-center overflow-hidden bg-[#d1d1d1]"
        >
            {/*the road*/}
            <div
            ref={road}
            className="road relative h-[30vh] min-h-[50] w-full bg-[#1e1e1e]"
            >
                {/*green area*/}
                <div className="trail absolute inset-0 origin-left bg-[#44dc7f]" />
                {/*headline*/}
                <h1 className="headline absolute inset-0 z-10 flex items-center whitespace-nowrap px-[4vw] text-[min(8.5vw,22vh)] font-black leading-none tracking-[0.02em] text-[#111]">
                     WELCOME ITZFIZZ 
                </h1>
                {/*car*/}

                <img
                  ref={car}
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/car.png`}
                  alt="car"
                  className="car absolute left-0 top-1/2 z-20 w-[34vh] max-w-none"  
                />
                <div className="absolute bottom-full left-[5vw] mb-4 flex gap-1.5 md:left-[47%]"> 
                    {stats.map((s, i) => s.row === "top" && <StatBox key={i} index={i} {...s} />)} 
                </div>

                <div className="absolute left-[5vw] top-full mt-4 flex gap-1.5 md:left-[41%]"> 
                    {stats.map((s, i) => s.row === "bottom" && <StatBox key={i} index={i} {...s} />)} 
                </div>
            </div>
        </section>

    );
}

function StatBox({ index,value,text,color}){
    return(
        <div className={`stat-${index } w-[44vw] rounded-xl px-6 py-5 md:w-[21vw] ${color} `}>
            <p className="text-4xl font-bold md:text-5xl">{value}</p>
            <p className="mt-1 text-sm md:text-base">{text}</p>
        </div>

    );
}