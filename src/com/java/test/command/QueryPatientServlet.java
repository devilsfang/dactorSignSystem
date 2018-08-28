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
import plugins.winning.inpatient.service.QueryDocListService;
import plugins.winning.inpatient.service.QueryPatientService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.QueryPatientInDataBean;
import servlet.inDataBean.QueryRecordInDataBean;
import servlet.outDataBean.QueryPatientOutDataBean;
import servlet.outDataBean.QueryRecordOutDataBean;

/**
 * Servlet implementation class QueryPatientServlet
 */
@WebServlet("/test/QueryPatient")
public class QueryPatientServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	boolean test = false;
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public QueryPatientServlet() {
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
		QueryPatientInDataBean inData = new QueryPatientInDataBean();
		VoResponse voResponse = new VoResponse();
		try {
			inData.setPatientName(request.getParameter("patientName"));
			inData.setPatientCode(request.getParameter("patientCode"));
			inData.setHospitalStatus(request.getParameter("hospitalStatus"));

			if (StringUtil.isEmpty(inData.getPatientName()) && StringUtil.isEmpty(inData.getPatientCode()) && StringUtil.isEmpty(inData.getHospitalStatus()) ) {
				throw new Exception("参数不能为空");
			}
		} catch (Exception e) {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("参数异常：" + e.getMessage());
			HttpResponseUtil.response(voResponse, response);
			return;
		}
		WinningResponse responseW = new WinningResponse();
		if (!test) {
		
		/*
		 * 将inDataBean转换为winning的request
		 */
			Map param = new HashMap();
			int condition;
			if(inData.getHospitalStatus().equals("1")){
				condition=1;
			}else if(inData.getHospitalStatus().equals("2")){
				condition=2;
			}else{
				condition=3;
			}
			param.put("cPatientName", inData.getPatientName());
			param.put("cPatientCode", inData.getPatientCode());
			//param.put("condition", condition);
		WinningRequest requestW = new WinningRequest();
		requestW.setParam(param);
		/***
		 * 调用winning的服务进行业务请求
		 */
		 responseW = QueryPatientService.QueryPatient(requestW);
		}
		else {
			List retDat=new ArrayList();
			
			Map testData = new HashMap();
			testData.put("patientName","测试1" );
			testData.put("patientCode","2904054" );
			testData.put("patientSex","男" );
			testData.put("patientAge","20" );
			retDat.add(testData);
			
			
			
			Map testData1 = new HashMap();
			
			testData1.put("patientName","测试2" );
			testData1.put("patientCode","2903696" );
			testData1.put("patientSex","男" );
			testData1.put("patientAge","20" );
			 retDat.add(testData1); 
			Map testData2 = new HashMap();
			testData2.put("patientName","测试3" );
			testData2.put("patientCode","2902108" );
			testData2.put("patientSex","男" );
			testData2.put("patientAge","20" );
			testData2.put("iDiagnoseId","1232544" );
			testData2.put("createTime","2018-12-12");
			retDat.add(testData2);
//			if(request.getParameter("patientName").equals("王六"))	retDat.add(testData);
			responseW.setRet_code("0000");
			responseW.setRet_msg("");
			responseW.setRet_data(retDat);
			
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
					Map data=(Map) responseWretData.get(i);
					QueryPatientOutDataBean outData = new QueryPatientOutDataBean();
					outData.setPatientName(data.get("cPatientName").toString());
					outData.setPatientCode(data.get("cPatientCode").toString());
					outData.setPatientSex(data.get("PatSex").toString());
					outData.setPatientAge(data.get("PatAge").toString());
					outData.setDiagnoseId(data.get("iDiagnoseId").toString());
					outData.setCreateTime(data.get("dDiagnoseDate").toString());
					retData.add(outData);
					
				}
				Map retMap=new HashMap();
				retMap.put("data", retData);//为了让前端可以自己组织行数据，需要将多行数据打包一层
				voResponse.setRet_code(Constains.SUCCESS_CODE);
				voResponse.setRet_msg(Constains.SUCCESS_MSG);
				voResponse.setRet_data(retMap);
				voResponse.setRet_count(retData.size());;

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
		String packageName = QueryPatientServlet.class.getPackage().getName();
		if (packageName.indexOf("test.") >= 0)
			test = true;
	}

}
