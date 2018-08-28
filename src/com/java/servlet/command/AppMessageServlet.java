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
import common.util.HttpResponseUtil;
import common.util.StringUtil;
import common.vo.VoResponse;
import plugins.winning.inpatient.service.LoginService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.AppMessageInDataBean;
import servlet.inDataBean.LoginInDataBean;
import servlet.outDataBean.LoginOutDataBean;
import socket.beans.MessageBean;
import socket.service.appMessage.AppMessageCommand;

@WebServlet("/AppMessage")
public class AppMessageServlet extends HttpServlet {

	boolean test = false;

	/**
	 * Constructor of the object.
	 */
	public AppMessageServlet() {
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

		/***
		 * 将request解析为inDataBean
		 */
		AppMessageInDataBean inData = new AppMessageInDataBean();
		VoResponse voResponse = new VoResponse();
		try {
			inData.setUserId(request.getParameter("userId").trim());
			inData.setCaseHisId(request.getParameter("caseHisId").trim());
			inData.setDiagnoseId(request.getParameter("diagnoseId"));
			inData.setRecordId(request.getParameter("recordId"));
			inData.setType(request.getParameter("type"));
			if (StringUtil.isEmpty(inData.getCaseHisId())||StringUtil.isEmpty(inData.getDiagnoseId())||StringUtil.isEmpty(inData.getRecordId())||StringUtil.isEmpty(inData.getType())||StringUtil.isEmpty(inData.getUserId())) {
				throw new Exception("参数不能为空");
			}
		} catch (Exception e) {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("参数异常：" + e.getMessage());
			HttpResponseUtil.response(voResponse, response);
			return;
		}
		try {
			// 冀素鹏 。。。。。。。。。
//			AppMessageCommand.setMessages(inDataBena);
			// 123456  55588  55588
			//A000001234500005558800055588   B000001234500005558800055588
			MessageBean inDataBean=new MessageBean();
			inDataBean.setUserId(inData.getUserId());
			inDataBean.setMessageCode(inData.getMessageCode(inData));
			inDataBean.setType(inData.getType());
			AppMessageCommand.setMessages(inDataBean);
			voResponse.setRet_code(Constains.SUCCESS_CODE);
			voResponse.setRet_msg(Constains.SUCCESS_MSG);
		} catch (Exception e) {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("返回数据异常：" + e.getMessage());
		}

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
		String packageName = AppMessageServlet.class.getPackage().getName();
		if (packageName.indexOf("test.") >= 0)
			test = true;
	}

}