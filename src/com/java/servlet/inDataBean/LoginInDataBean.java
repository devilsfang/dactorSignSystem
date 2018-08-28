package servlet.inDataBean;

import common.vo.VoRequest;

public class LoginInDataBean extends VoRequest {
	String userName;
	String passWord;
	String deviceTokens;//app客户端id 目前为ios系统的编号
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public String getDeviceTokens() {
		return deviceTokens;
	}
	public void setDeviceTokens(String deviceTokens) {
		this.deviceTokens = deviceTokens;
	}
	
	
}
