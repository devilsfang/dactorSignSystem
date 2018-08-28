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
import javax.xml.crypto.Data;

import common.util.Constains;
import common.util.HttpResponseUtil;
import common.util.StringUtil;
import common.vo.VoResponse;
import plugins.winning.inpatient.service.QueryDocListService;
import plugins.winning.inpatient.service.QueryRecordService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.DocListInDataBean;
import servlet.inDataBean.QueryRecordInDataBean;
import servlet.outDataBean.DocListOutDataBean;
import servlet.outDataBean.QueryRecordOutDataBean;

/**
 * Servlet implementation class QueryRecordServlet
 */
@WebServlet("/QueryRecord")
public class QueryRecordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	boolean test = false;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public QueryRecordServlet() {
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
		/***
		 * 将request解析为inDataBean
		 */
		QueryRecordInDataBean inData = new QueryRecordInDataBean();
		VoResponse voResponse = new VoResponse();
		try {
			inData.setUserId(request.getParameter("userId"));
			inData.setCheckDate(request.getParameter("checkDate"));
			
			if (StringUtil.isEmpty(inData.getUserId()) || StringUtil.isEmpty(inData.getCheckDate())) {
				throw new Exception("参数不能为空");
			}
		} catch (Exception e) {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("参数异常：" + e.getMessage());
			HttpResponseUtil.response(voResponse, response);
			return;
		}

		/***
		 * 将inDataBean转换为winning的request
		 */
		WinningResponse responseW = new WinningResponse();
		if (!test) {
			Map param = new HashMap();
			param.put("code", inData.getUserId());
			param.put("checkDate", inData.getCheckDate());
			WinningRequest requestW = new WinningRequest();
			requestW.setParam(param);
			/***
			 * 调用winning的服务进行业务请求
			 */
			responseW = QueryRecordService.QueryRecord(requestW);
		} else {
			List retDat = new ArrayList();
			Map testData = new HashMap();
			testData.put("cPatientName", "王莽 ");
			testData.put("cPatientCode", "001");
			testData.put("BookName", "查询");
			testData.put("bookId", "1001");
			testData.put("CheckDate", "2017-01-01 15:30:3");
			testData.put("PatSex", "男");
			testData.put("PatAge", "34");
			testData.put("iStatus", "通过");
			testData.put("RequestName", "李磊");
			testData.put("RequestDept", "皮肤科");
			testData.put("RequestTitl", "部长 ");
			retDat.add(testData);

			Map testData1 = new HashMap();
			testData1.put("cPatientName", "程世梅 ");
			testData1.put("cPatientCode", "002");
			testData1.put("BookName", "查询");
			testData1.put("bookId", "1003");
			testData1.put("CheckDate", "2017-01-01 15:30:3");
			testData1.put("PatSex", "女");
			testData1.put("PatAge", "55");
			testData1.put("iStatus", "通过");
			testData1.put("RequestName", "魏然");
			testData1.put("RequestDept", "妇科");
			testData1.put("RequestTitl", "医生 ");
			retDat.add(testData1);

			Map testData2 = new HashMap();
			testData2.put("cPatientName", "雷电 ");
			testData2.put("cPatientCode", "003");
			testData2.put("BookName", "查询");
			testData2.put("bookId", "1003");
			testData2.put("CheckDate", "2017-01-01 15:30:3");
			testData2.put("PatSex", "男");
			testData2.put("PatAge", "33");
			testData2.put("iStatus", "驳回");
			testData2.put("RequestName", "李磊");
			testData2.put("RequestDept", "皮肤科");
			testData2.put("RequestTitl", "部长 ");
			retDat.add(testData2);
			if (inData.getUserId().equals("123")) {
				responseW.setRet_code("0000");
				responseW.setRet_msg("");
				responseW.setRet_data(retDat);
			} else {
				responseW.setRet_code("9999");
				responseW.setRet_msg("不存在此用户");
			}

		}

		/***
		 * 将winning的 response解析为vo 1.将retData字符串转换为json对象 2.遍历json数组，将多行数据放入list
		 * 3.使用工具类，将outData通过response响应给请求端
		 */
		List retData = new ArrayList();
		List responseWretData = responseW.getRet_data();
		if (responseW.isSuccess()) {
			try {
				for (int i = 0; i < responseWretData.size(); i++) {
					Map data = (Map) responseWretData.get(i);
					QueryRecordOutDataBean outData = new QueryRecordOutDataBean();
					outData.setPatientName(data.get("cPatientName").toString());
					outData.setPatientCode(data.get("cPatientCode").toString());
					outData.setBookId(data.get("iBookId").toString());
					outData.setCaseHisId(data.get("iCaseHisId").toString());
					outData.setDiagnoseId(data.get("iDiagnoseId").toString());
					outData.setBookName(data.get("cBookName").toString());
					outData.setCheckDate(data.get("CheckDate").toString());
					outData.setPatientSex(data.get("PatSex").toString());
					outData.setPatientAge(data.get("PatAge").toString());
					outData.setStatus(data.get("iStatus").toString());
					outData.setRequestTime(data.get("RequestTime").toString());
					outData.setRequestName(data.get("RequestName").toString());
					outData.setRequestDept(data.get("RequestDept").toString());
					outData.setRequestTitl(data.get("RequestTitl").toString());
					outData.setCaseHisRecordId(data.get("iCaseHisRecordId").toString());
					outData.setRequestTel("");
					retData.add(outData);
				}
				voResponse.setRet_code(Constains.SUCCESS_CODE);
				voResponse.setRet_msg(Constains.SUCCESS_MSG);
				voResponse.setRet_data(retData);
				voResponse.setRet_count(retData.size());
			} catch (Exception e) {
				voResponse.setRet_code(Constains.ERROR_CODE);
				voResponse.setRet_msg("返回数据异常：" + e.getMessage());
			}

		} else {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("访问异常:" + responseW.getRet_msg());
		}

		HttpResponseUtil.response(voResponse, response);
	}

	public void init() throws ServletException {
		// Put your code here
		String packageName = LoginAppServlet.class.getPackage().getName();
		if (packageName.indexOf("test.") >= 0)
			test = true;
	}

}
