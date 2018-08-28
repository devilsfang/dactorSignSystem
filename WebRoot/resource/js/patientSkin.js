var appName="/dssweb/"
var patientSkinsA=[{
	name:"住院记录",
	icon:appName+"resource/images/icon/hospitalizationLog.png",
	backgroundColor:"#4fcae6",
	color:"#fff"
},{
	name:"检查记录",
	icon:appName+"resource/images/icon/checkLog.png",
	backgroundColor:"#7ad5c9",
	color:"#fff"
},{
	name:"检验记录",
	icon:appName+"resource/images/icon/testLog.png",
	backgroundColor:"#b5a1e0",
	color:"#fff"
},{
	name:"病程记录",
	icon:appName+"resource/images/icon/history.png",
	backgroundColor:"#f69781",
	color:"#fff"
},{
	name:"其他记录",
	icon:appName+"resource/images/icon/otherLog.png",
	backgroundColor:"#f69781",
	color:"#fff"
}] 
function getPatientSkin(name){
	for(i in patientSkinsA){
		if(patientSkinsA[i].name==name)
			return patientSkinsA[i];
	}
	return patientSkinsA[patientSkinsA.length-1];
}