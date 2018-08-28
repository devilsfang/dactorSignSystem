package test.command;

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

import common.util.Constains;
import common.util.HttpResponseUtil;
import common.util.StringUtil;
import common.vo.VoResponse;
import plugins.winning.inpatient.service.TreeService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.TreeInDataBean;
import servlet.outDataBean.TreeOutDataBean;

/**
 * Servlet implementation class TreeServlet
 */
@WebServlet("/test/Tree")
public class TreeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	boolean test = false;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public TreeServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		/***
		 * 将request解析为inDataBean
		 */
		TreeInDataBean inData = new TreeInDataBean();
		VoResponse voResponse = new VoResponse();
		try {
			inData.setPatientCode(request.getParameter("patientCode"));

			if (StringUtil.isEmpty(inData.getPatientCode())) {
				throw new Exception("参数不能为空");
			}
		} catch (Exception e) {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("参数异常：" + e.getMessage());
			HttpResponseUtil.response(voResponse, response);
			return;
		}
		WinningResponse responseW = new WinningResponse();
		if (false) {
			/***
			 * 将inDataBean转换为winning的request
			 */
			Map param = new HashMap();
			param.put("iDiagnoseId", inData.getPatientCode());
			WinningRequest requestW = new WinningRequest();
			requestW.setParam(param);
			/***
			 * 调用winning的服务进行业务请求
			 */
			responseW = TreeService.getTree(requestW);

		} else {
			List retDat=new ArrayList();
			Map testData = new HashMap();
			testData.put("IbookID","1002" );
			testData.put("cBookName","检查记录" );
			testData.put("iCaseHisId","" );
			
			Map testData1 = new HashMap();
			testData1.put("IbookID","1001" );
			testData1.put("cBookName","住院记录" );
			testData1.put("iCaseHisId","" );
			retDat.add(testData);
			retDat.add(testData1);
			if(true){
				responseW.setRet_code("0000");
				responseW.setRet_msg("");
				responseW.setRet_data(retDat);
			}else{
				responseW.setRet_code("9999");
				responseW.setRet_msg("不存在此用户");
			}

		}
		/***
		 * 将winning的 response解析为vo 1.将retData字符串转换为json对象 2.遍历json数组，将多行数据放入list
		 * 3.使用工具类，将outData通过response响应给请求端
		 */

		List<TreeOutDataBean> list = new ArrayList<TreeOutDataBean>();
		List responseWretData = responseW.getRet_data();
		if (true) {
			try {
				for (int i = 0; i < responseWretData.size(); i++) {
					TreeOutDataBean outData = new TreeOutDataBean();
					Map data = (Map) responseWretData.get(i);
					outData.setBookId(data.get("IbookID").toString());
					outData.setBookName(data.get("cBookName").toString().replace(" ", ""));
					if(outData.getBookName().length()>4){
						outData.setBookName(outData.getBookName().substring(0,3)+"…");
					}
					outData.setCaseHisId((data.get("iCaseHisId") != null) ? data.get("iCaseHisId").toString() : "");
					list.add(outData);
				}
				voResponse.setRet_count(responseWretData.size());
				voResponse.setRet_code(Constains.SUCCESS_CODE);
				voResponse.setRet_msg(Constains.SUCCESS_MSG);
				voResponse.setRet_data(list);
			} catch (Exception e) {
				voResponse.setRet_code(Constains.ERROR_CODE);
				voResponse.setRet_msg("返回数据异常：" + e.getMessage());
			}

		} else {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("登录失败：" + responseW.getRet_msg());
		}

		HttpResponseUtil.response(voResponse, response);

	}

}
