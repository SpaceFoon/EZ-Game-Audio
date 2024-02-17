//   const midiFilePath = "./tintin-on-the-moon.mid";
//   // Invoke a Tauri command to play the MIDI file using the system's default player
//   await invoke("play_midi_file", { path: midiFilePath });
//   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//   setGreetMsg(await invoke("greet", { name }));
// }

// import { invoke } from "@tauri-apps/api/tauri";
// const midiFilePath = "src/assets/tintin-on-the-moon.mid";
// await invoke("play_midi_file", { path: midiFilePath });

// import ReactDOM from "react-dom";
// import MidiPlayer from "react-midi-player";

// var _data = atob(
//   "\
// TVRoZAAAAAYAAQADAGRNVHJrAAAAGgD/AwtMaXR0bGUgTGFtZQD/UQMKLCsA/y8ATVRyawAAAPMA/wMG\
// THlyaWNzAP8BGEBUTWFyeSBXYXMgQSBMaXR0bGUgTGFtZWT/AQNcTWFL/wEDcnkgGf8BBHdhcyAy/wEC\
// YSAy/wEDbGl0Mv8BBHRsZSAy/wEFbGFtZSxk/wEEL0xpdDL/AQR0bGUgMv8BBWxhbWUsZP8BBC9MaXQy\
// /wEEdGxlIDL/AQVsYW1lLGT/AQMvTWFL/wEDcnkgGf8BBHdhcyAy/wECYSAy/wEDbGl0Mv8BBHRsZSAy\
// /wEFbGFtZSwy/wEDL0EgMv8BA2xpdDL/AQR0bGUgMv8BBWxhbWUgMv8BBHdhcyAy/wEEc2hlIQD/LwBN\
// VHJrAAAA8gD/AwVNdXNpYwDAC2SQQH9LgEBAAJA+fxmAPkAAkDx/MoA8QACQPn8ygD5AAJBAfzKAQEAA\
// kEB/MoBAQACQQH9agEBACpA+fzKAPkAAkD5/MoA+QACQPn9agD5ACpBAfzKAQEAAkEN/MoBDQACQQ39a\
// gENACpBAf0uAQEAAkD5/GYA+QACQPH8ygDxAAJA+fzKAPkAAkEB/MoBAQACQQH8ygEBAAJBAfzKAQEAZ\
// kEB/GYBAQACQPn8ygD5AAJA+fzKAPkAAkEB/MoBAQACQPn8ygD5AAJA8f2RAZABDZABIf1qAPEAAQEAA\
// Q0AASEAK/y8A"
// );

// ReactDOM.render(
//   <MidiPlayer data={_data} />,
//   document.getElementById("player1")
// );
// // or
// ReactDOM.render(
//   <MidiPlayer src="src/assets/tintin-on-the-moon.mid" />,
//   document.getElementById("player2")
// );
// be aware of the CORS-related issues when testing a local html file
