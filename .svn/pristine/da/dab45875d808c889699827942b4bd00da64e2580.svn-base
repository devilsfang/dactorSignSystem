package common.util;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import common.vo.VoResponse;

import net.sf.json.JSONObject;

public class HttpResponseUtil {
	public static void response(VoResponse voResponse,HttpServletResponse response) throws IOException{
		 
		JSONObject json = JSONObject.fromObject(voResponse);
		response.reset(); // 非常重要
		response.setContentType("text/html; charset=UTF-8");
		// 文件名应该编码成UTF-8
		OutputStream out = response.getOutputStream();
		out.write(json.toString().getBytes("UTF-8"));
		out.close();
	}
}
