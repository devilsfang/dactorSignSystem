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
import plugins.winning.inpatient.service.PatientDetailService;
import plugins.winning.inpatient.service.QueryDocListService;
import plugins.winning.inpatient.service.SignDetailService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.PatientDetailInDataBean;
import servlet.inDataBean.SignDetailInDataBean;
import servlet.outDataBean.PatientDetailOutDataBean;
import servlet.outDataBean.SignDetailOutDataBean;

/**
 * Servlet implementation class PatientDetailServlet
 */
@WebServlet("/test/PatientDetail")
public class PatientDetailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	boolean test = false;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PatientDetailServlet() {
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
		PatientDetailInDataBean inData=new PatientDetailInDataBean();
		inData.setPatientCode(request.getParameter("patientCode"));
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
		/***
		 * 将inDataBean转换为winning的request
		 */
		WinningResponse responseW = new WinningResponse();
		if (!test) {
		Map param = new HashMap();
		param.put("cPatientCode", inData.getPatientCode());
		WinningRequest requestW = new WinningRequest();
		requestW.setParam(param);
		/***
		 * 调用winning的服务进行业务请求
		 */
		 responseW = PatientDetailService.PatientDetail(requestW);

		/***
		 * 将winning的 response解析为vo 1.将retData字符串转换为json对象 2.遍历json数组，将多行数据放入list
		 * 3.使用工具类，将outData通过response响应给请求端
		 */}else {
			    List retDat=new ArrayList();
				Map testData = new HashMap();
				testData.put("BookName","患者详情" );
				testData.put("type","text" );
				testData.put("data","这是内容" );
				retDat.add(testData);
				if(true){
					responseW.setRet_code("0000");
					responseW.setRet_msg("");
					responseW.setRet_data(retDat);
				}else{
					responseW.setRet_code("9999");
					responseW.setRet_msg("不存在此用户");
				}
				
			}
		List retData=new ArrayList();
		List responseWretData = responseW.getRet_data();
		if(responseW.isSuccess()){
			try{
				for(int i=0;i<responseWretData.size();i++){
				Map data=(Map) responseWretData.get(i);
				PatientDetailOutDataBean outData = new PatientDetailOutDataBean();
				outData.setBookName(data.get("BookName").toString());
				outData.setTextFormat(data.get("type").toString());
				outData.setText(data.get("data").toString());
				voResponse.setRet_code(Constains.SUCCESS_CODE);
				voResponse.setRet_msg(Constains.SUCCESS_MSG);
				voResponse.setRet_data(outData);
				voResponse.setRet_count(1);
				retData.add(outData);
				}
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
		String packageName = PatientDetailServlet.class.getPackage().getName();
		if (packageName.indexOf("test.") >= 0)
			test = true;
	}

}
