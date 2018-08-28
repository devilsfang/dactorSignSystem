package servlet.command;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.Config;
import common.util.Constains;
import common.util.HttpResponseUtil;
import common.vo.VoResponse;
import plugins.winning.inpatient.service.QueryDocListService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.inDataBean.QueryRecordInDataBean;
import servlet.inDataBean.VersonDetectionUpdateInDataBean;
import servlet.outDataBean.QueryRecordOutDataBean;
import servlet.outDataBean.VersionDetectionUpdateOutDataBean;

/**
 * Servlet implementation class versionDetectionUpdateServlet
 */
@WebServlet("/VersionDetectionUpdate")
public class VersionDetectionUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public VersionDetectionUpdateServlet() {
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
		VersonDetectionUpdateInDataBean inData=new VersonDetectionUpdateInDataBean();
		inData.setVersion(request.getParameter("version"));

		VersionDetectionUpdateOutDataBean outData = new VersionDetectionUpdateOutDataBean();
		VoResponse voResponse=new VoResponse();
		if(inData.getVersion()!="1"){
			try{
				outData.setVersion(Config.getInstance().AppVersion);
			    outData.setApkUrl(Config.getInstance().ApkUrl);
				outData.setConfig(Config.getInstance().Config.toString());
				outData.setCopyRight(Config.getInstance().CopyRight);
				outData.setCallForHelp(Config.getInstance().CallForHelp);
				outData.setCallForContact(Config.getInstance().CallForContact);
				outData.setAddrForContact(Config.getInstance().AddrForContact);
				voResponse.setRet_code(Constains.SUCCESS_CODE);
				voResponse.setRet_msg(Constains.SUCCESS_MSG);
				voResponse.setRet_data(outData);
				voResponse.setRet_count(1);
			}catch(Exception e){
				voResponse.setRet_code(Constains.ERROR_CODE);
				voResponse.setRet_msg("返回数据异常："+e.getMessage());
			}
			
		}else{
			voResponse.setRet_code(Constains.ERROR_CODE);
			voResponse.setRet_msg("访问异常:");
		}
		
		HttpResponseUtil.response(voResponse, response);
	}

}
