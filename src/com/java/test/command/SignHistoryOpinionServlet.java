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
import plugins.winning.inpatient.service.SignHistoryOpinionService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.SignDetailInDataBean;
import servlet.inDataBean.SignHistoryOpinionInDataBean;
import servlet.outDataBean.SignDetailOutDataBean;
import servlet.outDataBean.SignHistoryOpinionOutDataBean;

/**
 * Servlet implementation class SignHistoryOpinionServlet
 */
@WebServlet("/test/SignHistoryOpinion")
public class SignHistoryOpinionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	boolean test = false;  
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignHistoryOpinionServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		SignHistoryOpinionInDataBean inData=new SignHistoryOpinionInDataBean();
		VoResponse voResponse = new VoResponse();
		try {
			inData.setCaseHisId(request.getParameter("caseHisId"));

			if (StringUtil.isEmpty(inData.getCaseHisId()) ) {
				throw new Exception("参数不能为空");
			}
		} catch (Exception e) {
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("参数异常：" + e.getMessage());
			HttpResponseUtil.response(voResponse, response);
			return;
		}
		WinningResponse responseW = new WinningResponse();
		

		/***
		 * 将inDataBean转换为winning的request
		 */
		if (!test) {
		Map param = new HashMap();
		param.put("iCaseId", inData.getCaseHisId());
		WinningRequest requestW = new WinningRequest();
		requestW.setParam(param);
		/***
		 * 调用winning的服务进行业务请求
		 */
		 responseW = SignHistoryOpinionService.SignHistoryOpinion(requestW);
		}else {
			Map testData = new HashMap();
			List retDat=new ArrayList();
			
			testData.put("checkName","李肃肃" );
			testData.put("rejectDate","2018-6-20 15:30:30" );
			testData.put("rejectReason","内容不全" );
			retDat.add(testData);
			Map testData1= new HashMap();
			testData1.put("checkName","石呼呼" );
			testData1.put("rejectDate","2018-6-20 15:30:30" );
			testData1.put("rejectReason","内容不全" );
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
		List retData=new ArrayList();
		List responseWretData = responseW.getRet_data();
		
		if(responseW.isSuccess()){
			try{
				for(int i=0;i<responseWretData.size();i++){
				Map data=(Map) responseWretData.get(i);
				SignHistoryOpinionOutDataBean outData = new SignHistoryOpinionOutDataBean();
				outData.setCheckName(data.get("CheckName").toString());
				outData.setRejectDate(data.get("CheckDate").toString());
				outData.setRejectReason(data.get("cRejectReason")==null?"":data.get("cRejectReason").toString());
				retData.add(outData);
				}
				voResponse.setRet_code(Constains.SUCCESS_CODE);
				voResponse.setRet_msg(Constains.SUCCESS_MSG);
				voResponse.setRet_data(retData);
				voResponse.setRet_count(retData.size());
			}catch(Exception e){
				voResponse.setRet_code(Constains.ERROR_CODE);
				voResponse.setRet_msg("返回数据异常："+e.getMessage());
			}
			
		}else{
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("访问异常:"+responseW.getRet_msg());
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
