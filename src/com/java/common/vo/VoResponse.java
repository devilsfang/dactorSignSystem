package common.vo;

public class VoResponse {
	String ret_code;
	String ret_msg;
	Object ret_data;
	int ret_count;
	public String getRet_code() {
		return ret_code;
	}
	public void setRet_code(String ret_code) {
		this.ret_code = ret_code;
	}
	public String getRet_msg() {
		return ret_msg;
	}
	public void setRet_msg(String ret_msg) {
		this.ret_msg = ret_msg;
	}
	public Object getRet_data() {
		return ret_data;
	}
	public void setRet_data(Object ret_data) {
		this.ret_data = ret_data;
	}
	public int getRet_count() {
		return ret_count;
	}
	public void setRet_count(int ret_count) {
		this.ret_count = ret_count;
	}
	
}
