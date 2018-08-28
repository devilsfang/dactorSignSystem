package socket.beans;

import net.sf.json.JSONObject;
import socket.util.LoUtils;

/**
 * 报文头解析类 将应用数据内容与报文附加消息分离
 * 
 * @ClassName Protocol
 * @author hllian
 * @Date Jan 8, 2015 11:16:43 AM
 */
public class InDataBean {
	/** 协议配置 1: 报文头 **/
	public static final int CONFIG_HEADER = 4;

	private String request; // 报文原文
	private int length; // 报文长度
	private String header; // 报文头
	private String data; // 数据
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public InDataBean() {

	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public InDataBean(String str) {
		this.request = str;
		try {
			this.header = str.substring(0, CONFIG_HEADER);
			this.data = str.substring(CONFIG_HEADER);
			JSONObject json = JSONObject.fromObject(this.data);
			this.id = json.getString("id");
		} catch (Exception e) {
			System.out.println("警告：解析有异常！");
		}
	}

	@Override
	public String toString() {
		StringBuilder stb = new StringBuilder();
		stb.append("LENGTH: " + length + "\n");
		stb.append("HEADER: " + header + "\n");
		stb.append("  DATA: " + data);
		return stb.toString();
	}

}
