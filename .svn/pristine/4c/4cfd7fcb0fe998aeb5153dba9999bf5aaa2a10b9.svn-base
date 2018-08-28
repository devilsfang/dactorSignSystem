package servlet.command;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.Config;
import common.util.Constains;
import common.util.EhcacheExtendWatcher;
import common.util.HttpResponseUtil;
import common.util.StringUtil;
import common.vo.VoResponse;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import plugins.winning.inpatient.service.LoginService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.LoginInDataBean;
import servlet.outDataBean.LoginOutDataBean;
import socket.service.appMessage.ClientManager;
import socket.util.PortListener;

@WebServlet("/Socket")
public class SocketManagerServlet extends HttpServlet {

	boolean test = false;
	/**
	 * Constructor of the object.
	 */
	public SocketManagerServlet() {
		super();
	}
	private static final CacheManager cacheManager = CacheManager.create();
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

		/***
		 * 将request解析为inDataBean
		 */
		LoginInDataBean inData = new LoginInDataBean();
		VoResponse voResponse = new VoResponse();
		try {
			inData.setPassWord(request.getParameter("pwd"));
			if (StringUtil.isEmpty(inData.getPassWord())) {
				throw new Exception("参数不能为空");
			}
		} catch (Exception e) {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("参数异常：" + e.getMessage());
			HttpResponseUtil.response(voResponse, response);
			return;
		}
		WinningResponse responseW = new WinningResponse();

		List retDat = new ArrayList();
		if (inData.getPassWord().equals("0001")) {
			Map testData = new HashMap();
			testData.put("clientCount", ClientManager.count()+"");
			EhcacheExtendWatcher watcher=new EhcacheExtendWatcher(cacheManager.getCache("AutoAssignUsers"));
			testData.put("cache", watcher.getGlobalResult());
			retDat.add(testData);
		}else if (inData.getPassWord().equals("0002")) {
			retDat=ClientManager.getList();
		}
		voResponse.setRet_data(retDat);
		HttpResponseUtil.response(voResponse, response);

	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
		String packageName = SocketManagerServlet.class.getPackage().getName();
		if (packageName.indexOf("test.") >= 0)
			test = true;
	}
	public static void writeCache(String key, String value) {
		try {
			// Cache cache = cacheManager.getCache("resourceCache");//集群
			Cache cache = cacheManager.getCache("AutoAssignUsers");// 单机
			Element element = new Element(key, value);
			cache.put(element);
		} catch (Throwable t) {
			t.printStackTrace();
		}
	}

	public static String readCache(String key) {
		try {
			// Cache cache = cacheManager.getCache("resourceCache");
			Cache cache = cacheManager.getCache("AutoAssignUsers");// 单机
			if (cache.get(key) == null)
				return "";
			else
				return cache.get(key).getValue().toString();
		} catch (Throwable t) {
			t.printStackTrace();
			return "";
		}
	}
}
