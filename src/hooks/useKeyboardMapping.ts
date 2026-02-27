import { TrackId } from "./useSequencer";

export const TRACK_KEYS: Record<TrackId, string[]> = {
  kick:  ["q","w","e","r","t","y","u","i","o","p","[","]","\\","a","s","d"],
  snare: ["z","x","c","v","b","n","m",",",".","/",";","'","1","2","3","4"],
  hihat: ["5","6","7","8","9","0","-","=","f","g","h","j","k","l","Tab","CapsLock"],
  bass:  ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","Insert","Home","PageUp","Delete"],
};

export const KEY_LABELS: Record<string, string> = {
  q:"Q",w:"W",e:"E",r:"R",t:"T",y:"Y",u:"U",i:"I",o:"O",p:"P",
  "[":" [","]":"]","\\":"\\",a:"A",s:"S",d:"D",
  z:"Z",x:"X",c:"C",v:"V",b:"B",n:"N",m:"M",",":"<",".":" >","/":"?",
  ";":";","'":"'",
  "1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","0":"0",
  "-":"-","=":"=",
  f:"F",g:"G",h:"H",j:"J",k:"K",l:"L",
  Tab:"Tab",CapsLock:"Cap",
  F1:"F1",F2:"F2",F3:"F3",F4:"F4",F5:"F5",F6:"F6",F7:"F7",F8:"F8",
  F9:"F9",F10:"F10",F11:"F11",F12:"F12",
  Insert:"Ins",Home:"Hm",PageUp:"PU",Delete:"Del",
};
