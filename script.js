const staff = [
 {id:1,name:"Jordan Davis",initials:"JD",role:"Product Manager",dept:"Management",email:"jordan.davis@teamspace.demo",status:"Online",tone:"purple"},
 {id:2,name:"Amara Okafor",initials:"AO",role:"Software Engineer",dept:"Engineering",email:"amara.okafor@teamspace.demo",status:"Online",tone:"blue"},
 {id:3,name:"Liam Chen",initials:"LC",role:"UX/UI Designer",dept:"Design",email:"liam.chen@teamspace.demo",status:"Online",tone:"green"},
 {id:4,name:"Sofia Martinez",initials:"SM",role:"Marketing Lead",dept:"Marketing",email:"sofia.martinez@teamspace.demo",status:"Away",tone:"pink"},
 {id:5,name:"Noah Williams",initials:"NW",role:"People Operations",dept:"Human Resources",email:"noah.williams@teamspace.demo",status:"Online",tone:"orange"},
 {id:6,name:"Fatima Bello",initials:"FB",role:"Frontend Developer",dept:"Engineering",email:"fatima.bello@teamspace.demo",status:"Away",tone:"teal"}
];
const conversations = [
 {id:"engineering",name:"Engineering team",initials:"EN",tone:"blue",sub:"8 members · 4 online",preview:"Amara: The latest build is ready for review.",time:"2m",members:["AO","FB"],messages:[
  {who:"Amara Okafor",initials:"AO",tone:"blue",time:"10:21 AM",text:"Morning team! The latest build is ready for review. Please test the new profile page."},
  {who:"Fatima Bello",initials:"FB",tone:"teal",time:"10:24 AM",text:"Great work, Amara. I’ll check the mobile layout this morning."},
  {who:"You",initials:"JD",tone:"purple",time:"10:26 AM",text:"Thanks everyone! Please share any issues here so we can track them."}
 ]},
 {id:"general",name:"General",initials:"GE",tone:"green",sub:"24 members · 8 online",preview:"Sofia: Welcome to the new workspace!",time:"18m",members:["SM","LC"],messages:[
  {who:"Sofia Martinez",initials:"SM",tone:"pink",time:"9:42 AM",text:"Welcome to our new company workspace! Use this channel for general announcements."},
  {who:"Liam Chen",initials:"LC",tone:"green",time:"9:48 AM",text:"Looking good. Happy to have one place for team updates."}
 ]},
 {id:"design",name:"Design team",initials:"DE",tone:"pink",sub:"5 members · 2 online",preview:"Liam: I added the new dashboard mockup.",time:"1h",members:["LC"],messages:[
  {who:"Liam Chen",initials:"LC",tone:"green",time:"9:05 AM",text:"I added the new dashboard mockup. Please take a look and leave feedback."},
  {who:"You",initials:"JD",tone:"purple",time:"9:12 AM",text:"Nice work! The cleaner layout makes the staff directory easier to use."}
 ]},
 {id:"marketing",name:"Marketing team",initials:"MK",tone:"orange",sub:"6 members · 1 online",preview:"Sofia: Campaign notes are uploaded.",time:"3h",members:["SM"],messages:[
  {who:"Sofia Martinez",initials:"SM",tone:"pink",time:"8:15 AM",text:"Campaign notes are uploaded. Please add your ideas before tomorrow's check-in."}
 ]}
];
const departments = [
 {name:"Engineering",icon:"⌘",color:"blue",desc:"Build, test, and maintain the tools that help our company work.",count:8,people:["AO","FB","JD"],tone:"blue"},
 {name:"Design",icon:"✧",color:"pink",desc:"Create simple, thoughtful experiences for our staff and customers.",count:5,people:["LC","SM"],tone:"pink"},
 {name:"Marketing",icon:"◈",color:"orange",desc:"Share our story, support campaigns, and connect with our audience.",count:6,people:["SM","AO"],tone:"orange"},
 {name:"Human Resources",icon:"♙",color:"green",desc:"Support staff, onboarding, learning, and a healthy workplace.",count:5,people:["NW","JD"],tone:"green"}
];
let activeConversation = "engineering";
const $ = id => document.getElementById(id);
const toneClass = tone => `avatar-${tone}`;
function avatar(initials,tone,cls="avatar"){return `<div class="${cls} ${toneClass(tone)}">${initials}</div>`}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2500)}
function go(view){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));$(view+"View").classList.add("active-view");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));$("crumb").textContent=({home:"Overview",people:"Staff directory",chat:"Team chat",teams:"Departments"})[view];}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
$("newMessageBtn").addEventListener("click",()=>{go("chat");$("messageInput").focus()});
function renderHomePeople(){ $("homePeople").innerHTML=staff.slice(1,5).map(p=>`<div class="person-mini">${avatar(p.initials,p.tone)}<div class="person-info"><strong>${p.name}</strong><small>${p.role}</small></div><i class="presence" style="${p.status==="Away"?"background:#f0b75e":""}"></i></div>`).join("");}
function renderRecent(){ $("recentChats").innerHTML=conversations.slice(0,3).map(c=>`<div class="conversation-row" data-chat="${c.id}">${avatar(c.initials,c.tone)}<div class="conversation-copy"><strong>${c.name}</strong><p>${c.preview}</p></div><div class="conversation-meta">${c.time}${c.id==="engineering"?'<div class="unread">2</div>':""}</div></div>`).join("");document.querySelectorAll("[data-chat]").forEach(el=>el.addEventListener("click",()=>openChat(el.dataset.chat)));}
function renderStaff(){const q=($("staffSearch").value||"").toLowerCase(),dept=$("departmentFilter").value;const found=staff.filter(p=>(dept==="All"||p.dept===dept)&&`${p.name} ${p.role} ${p.dept}`.toLowerCase().includes(q));$("staffCount").textContent=`${found.length} team member${found.length===1?"":"s"}`;$("staffGrid").innerHTML=found.map(p=>`<article class="staff-card"><div class="staff-card-top">${avatar(p.initials,p.tone)}<span class="profile-menu">•••</span></div><h3>${p.name}</h3><p class="staff-role">${p.role}</p><span class="dept-tag">${p.dept}</span><div class="staff-card-bottom"><span>${p.email}</span><span class="online-label"><i style="${p.status==="Away"?"background:#f0b75e":""}"></i>${p.status}</span></div></article>`).join("")||'<p class="muted">No staff match that search.</p>';}
$("staffSearch").addEventListener("input",renderStaff);$("departmentFilter").addEventListener("change",renderStaff);
function renderThreads(){$("chatThreads").innerHTML=conversations.map(c=>`<div class="thread ${c.id===activeConversation?"active":""}" data-thread="${c.id}">${avatar(c.initials,c.tone)}<div class="thread-copy"><strong>${c.name}</strong><small>${c.messages[c.messages.length-1]?.text||c.preview}</small></div></div>`).join("");document.querySelectorAll("[data-thread]").forEach(el=>el.addEventListener("click",()=>openChat(el.dataset.thread)));}
function renderMessages(){const c=conversations.find(x=>x.id===activeConversation);$("activeChatName").textContent=c.name;$("activeChatSub").textContent=c.sub;$("activeChatAvatar").textContent=c.initials;$("activeChatAvatar").className=`mini-avatar ${toneClass(c.tone)}`;$("chatMessages").innerHTML=c.messages.map(m=>`<div class="message ${m.who==="You"?"own":""}">${avatar(m.initials,m.tone)}<div class="message-body"><div class="message-meta"><strong>${m.who}</strong><small>${m.time}</small></div><div class="bubble">${escapeHTML(m.text)}</div></div></div>`).join("");$("chatMessages").scrollTop=$("chatMessages").scrollHeight;renderThreads();}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function openChat(id){activeConversation=id;go("chat");renderMessages();}
$("messageForm").addEventListener("submit",e=>{e.preventDefault();const input=$("messageInput"),text=input.value.trim();if(!text)return;const c=conversations.find(x=>x.id===activeConversation);c.messages.push({who:"You",initials:"JD",tone:"purple",time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),text});c.preview=`You: ${text}`;c.time="now";input.value="";renderMessages();renderRecent();$("messageCount").textContent=Number($("messageCount").textContent)+1;});
$("addConversation").addEventListener("click",()=>showToast("Demo: ask your project supervisor before adding real staff accounts."));
function renderDepartments(){$("departmentGrid").innerHTML=departments.map(d=>`<article class="department-card"><div class="dept-icon ${toneClass(d.color)}">${d.icon}</div><h2>${d.name}</h2><p>${d.desc}</p><div class="dept-footer"><span>${d.count} members</span><div class="dept-people">${d.people.map((initials,i)=>{const p=staff.find(s=>s.initials===initials)||staff[i];return avatar(initials,p.tone,"mini-avatar")}).join("")}</div></div></article>`).join("");}
$("searchInput").addEventListener("input",e=>{const q=e.target.value.trim();if(!q)return;go("people");$("staffSearch").value=q;renderStaff();});
renderHomePeople();renderRecent();renderStaff();renderMessages();renderDepartments();
