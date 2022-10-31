const listeners:any = [];
declare const window: any;
let lastTime = 0;

let controlType = "keyboard";

export const addListener = (callback: () => void) => {
  listeners.push(callback);
};

const notify = () => {
  listeners.forEach((listener:any) => listener());
};

const eventDispatcher = (type: "audio" | "keyboard") => {
  if (controlType === type) {
    notify();
  }
};

let initKeyboardListener =()=> {
  window.addEventListener("keydown", (event:any) => {
    if (event.key === " " || event.key === "ArrowUp") {
      eventDispatcher("keyboard");
    }
  });
  window.addEventListener("touchstart", (event:any) => {
    eventDispatcher("keyboard");
  });
//   window.addEventListener("click", (event:any) => {
//     eventDispatcher("keyboard");
//   });
}
let initAudioListener = ()=> {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // 获取用户的 media 信息
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      window.localStream = stream;
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
      mediaStreamSource.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);

      scriptProcessor.onaudioprocess = function (e:any) {
        // 获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
        let buffer = e.inputBuffer.getChannelData(0);
        // 获取缓冲区中最大的音量值
        let maxVal = Math.max.apply(Math,buffer);
        if (maxVal * 100 > 2 && performance.now() - lastTime > 300) {
          lastTime = performance.now();
          eventDispatcher("audio");
        }
      };
    });
  }
}

// let once = (factory: () => any)=> {
//   let inited = false;
//   return () => {
//     if (!inited) {
//       factory();
//       inited = true;
//     }
//   };
// }

initKeyboardListener();
// const lazyInitAudioListener = once(initAudioListener);

export const setControlType = (type:string) => {
  controlType = type;

  if (type === "audio") {
    // lazyInitAudioListener()
    initAudioListener();
  }else{
    window.localStream.getTracks().forEach( (track:any) => {
        track.stop();
    });
  }
};
