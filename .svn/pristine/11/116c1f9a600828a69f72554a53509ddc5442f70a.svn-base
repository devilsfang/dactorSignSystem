package test;


import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

public class WNTest extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public WNTest() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to
	 * post.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		
		String type = request.getParameter("type");
		Map<String,Object> params=new HashMap<>();
		
		
		switch (type) {
		case "1":
			params.put("ret_code", "0000");
			params.put("ret_msg", "操作成功");
			Map data=new HashMap();
			data.put("name", "123");
			params.put("ret_data", data);
			params.put("ret_count", "1");
			break;
		case "2":
			params.put("ret_code", "0000");
			params.put("ret_msg", "操作成功");
			List list=new ArrayList();
			
			for(int i=0;i<3;i++){
				Map data2=new HashMap();
				data2.put("name", "123");
				data2.put("id",i);
				list.add(data2);
			}
			
			params.put("ret_data", list);
			params.put("ret_count", list.size());
			break;
		default:
			break;

		}
		JSONObject json = JSONObject.fromObject(params);
		
		response.reset(); // 非常重要
		response.setContentType("text/html; charset=UTF-8");
		// 文件名应该编码成UTF-8
		OutputStream out = response.getOutputStream();
		out.write(json.toString().getBytes("UTF-8"));
		out.close();
		
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

	 
                                                                
	

	
	

	
	
	
	
	
	
	
	
	
	
}
