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
import plugins.winning.inpatient.service.SignDetailService;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import servlet.command.QueryPatientServlet;
import servlet.inDataBean.QueryPatientInDataBean;
import servlet.inDataBean.QueryRecordInDataBean;
import servlet.inDataBean.SignDetailInDataBean;
import servlet.outDataBean.QueryRecordOutDataBean;
import servlet.outDataBean.SignDetailOutDataBean;

/**
 * Servlet implementation class SignDetailServlet
 */
@WebServlet("/test/SignDetail")
public class SignDetailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	boolean test = false;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SignDetailServlet() {
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
		SignDetailInDataBean inData = new SignDetailInDataBean();
		VoResponse voResponse = new VoResponse();
		try {
			inData.setRecordId(request.getParameter("recordId"));
			inData.setBookId(request.getParameter("bookId"));
			inData.setCaseHisId(request.getParameter("caseHisId"));
			inData.setPatientCode(request.getParameter("patientCode"));

			// if (StringUtil.isEmpty(inData.getBookId())) {
			// throw new Exception("参数不能为空");
			// }
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

			param.put("ibookId", inData.getBookId());
			param.put("iDiagnoseId", inData.getPatientCode());
			param.put("iCaseId", StringUtil.isEmpty(inData.getCaseHisId())?"0":inData.getCaseHisId());
			param.put("iRecordId", StringUtil.isEmpty(inData.getRecordId())?"0":inData.getRecordId());
			WinningRequest requestW = new WinningRequest();
			requestW.setParam(param);
			/***
			 * 调用winning的服务进行业务请求
			 */
			responseW = SignDetailService.SignDetailService(requestW);
		} else {
			List retDat = new ArrayList();
			if(inData.getBookId().equals("1001")){
			Map testData = new HashMap();
			testData.put("type", "text");
			testData.put("data", "[{\"type\":\"text\",\"data\":\"\\r\\n入 院 记 录\\r\\n    姓    名：平语轩\\r\\n出 生 地：壶关县妇幼保健院\\r\\n    性    别：男\\r\\n出生日期：2017-09-19\\r\\n    年    龄：7月3天\\r\\n入院时间：2018-04-22 10:34\\r\\n    民    族：汉族\\r\\n记录时间：2018-04-22 11:30\\r\\n    过 敏 史：无\\r\\n病史陈述者：患儿母亲\\r\\n    住    址：长治市壶关县晋庄镇池则掌村\\r\\n   主诉：咳嗽半天，抽搐1次。\\r\\n   现病史：患儿于入院前半天天无诱因出现咳嗽，呈轻咳，每次咳嗽1-2声。抽搐表现为双眼上翻，面色发青，左侧上下肢抽动,呼之不应,持续约4-5分钟缓解，抽搐神志渐恢复，伴有流涕，呈清水样，呕吐1次，为胃内容物，呈非喷射状。无发热、腹泻、皮疹表现。今日就诊于我院，门诊以“急性上呼吸道感染、抽搐原因待查”收入院。患儿自发病以来，精神尚好，食欲差，大小便正常。\\r\\n   既往史：患儿3天前曾无诱因“抽搐”1次，不伴发热，未诊治。否认有结核、肝炎等传染病接触史，否认有手术、外伤、输血史。否认有药物、食物及其他过敏史。\\r\\n   个人史：\\r\\n   新生儿状况:第二胎第二产，足月顺产,否认窒息缺氧史,新生儿期健康。\\r\\n   喂养史：母乳喂养，未按时添加维生素D及钙制剂，5个月时添加辅食。\\r\\n   生长发育史: 3个月能抬头；4个月能笑出声；现会独坐；能发“爸爸”、“妈妈”等单音。\\r\\n   居住环境：居住于壶关县晋庄镇池则掌村。否认有害物质及放射线接触史。\\r\\n   预防接种史:卡介苗(接种)、乙肝疫苗(接种)、白百破三联疫苗(接种)、脊髓灰质炎疫苗(接种)、麻疹疫苗(未接种)、肺炎疫苗（未接种）。\\r\\n   家族史：父母亲身体健康，无烟酒嗜好；无先天性、家族性、遗传性疾病史；无哮喘等呼吸系统疾病家族史；无肝炎、结核等传染病病史。\\r\\n体格检查\\r\\n        T 37.0℃     P 136次/分     R 36次/分      W 7kg\\r\\n   一般情况:发育正常，营养良好，自动体位，精神尚可，查体合作。\\r\\n   皮肤: 未见皮疹、出血点、瘀点瘀斑，未见黄染、水肿，皮肤弹性良好，皮下脂肪厚度正常，卡疤阳性。\\r\\n   淋巴系统: 全身浅表淋巴结未触及肿大。\\r\\n   头部:头颅形态正常，头发黑色，有光泽，分布均匀。前囟1.0×1.0cm大小，平坦。\\r\\n   眼: 双眼窝无凹陷，双眼睑无水肿，结膜未见充血，巩膜无黄染。角膜透明，无混浊或溃疡。双瞳孔等大等圆，直径3.0mm，对光反射灵敏。\\r\\n   耳: 耳廓无畸形，无牵拉痛；外耳道无分泌物。\\r\\n   鼻: 无畸形，鼻前庭无异常分泌物，鼻唇沟对称。\\r\\n   口腔: 口唇红润，口周无发绀，咽部充血，口腔粘膜光滑，未见溃疡。喉发音无嘶哑，伸舌居中。\\r\\n   颈部: 对称，颈无抵抗，未见颈静脉怒张及颈动脉异常搏动，气管居中，未触及甲状腺肿大。\\r\\n   胸部：胸廓对称，无鸡胸、郝氏沟、肋外翻，三凹征阴性。\\r\\n   肺脏： \\r\\n   视诊：两侧呼吸运动一致，肋间隙无增宽，无变窄。\\r\\n   触诊：无压痛，无皮下捻发感，无胸膜摩擦感。\\r\\n   叩诊：呈清音。\\r\\n   听诊：双肺呼吸音粗，未闻及干湿罗音。\\r\\n  心脏：\\r\\n   视诊：心前区无隆起、无异常搏动。心尖搏动位置在左第四肋间锁中线外1.0cm。\\r\\n   触诊：无抬举性搏动，无心包摩擦感、无震颤。\\r\\n   叩诊：心界不大。\\r\\n   听诊：心率136次/分，心音有力，节律齐，心脏各瓣膜听诊区未闻及杂音，无心包摩擦音。      \\r\\n  腹部：\\r\\n  视诊：外形对称平坦，无膨隆、静脉曲张、肠型，脐部无膨隆。\\r\\n  触诊：腹部平软，无腹肌紧张、压痛、反跳痛，无肿块。肝、脾肋下未触及肿大。\\r\\n  叩诊：肝浊音界正常，无移动性浊音或过度鼓音。\\r\\n  听诊：肠鸣音正常。              \\r\\n  肛门及外生殖器: 肛门、外生殖器未见异常。\\r\\n  脊柱:外观无畸形，无活动受限。\\r\\n  四肢:未见畸形，关节无红、肿、痛、热，无活动受限，无杵状指(趾)，双下肢无肿胀。\\r\\n  神经系统:四肢肌张力、肌力正常，腹壁反射、膝腱反射均可正常引出，布氏征、克 氏征、巴氏征均阴性。\\r\\n                           辅 助 检 查\\r\\n     血常规：白细胞9.13×109 /L,中性粒细胞31.04%，淋巴细胞58.5%，血红蛋白110g/L，CRP3.28mg/L（2018-04-22 本院）。\\r\\n      微量血糖：5.9mmol/L。\\r\\n      经皮测血氧饱和度：100%。\\r\\n      头颅CT：双侧额、颞、顶叶部蛛网膜下间隙增宽，前纵裂池增宽，脑实质未见明显异常密度影，灰白质分界尚可，脑室大小、形态未见明显异常，中线结构居中。 检查结论：脑外间隙增宽（2018-04-22 本院）。\\r\\n                                       初步诊断：\\r\\n\\t                                          \\t  癫痫？\\r\\n                                            急性上呼吸道感染\\r\\n　　                                        医师签字： \"}]");
			retDat.add(testData);
			}else{
				Map testData1 = new HashMap();
				testData1.put("type", "text");
				testData1.put("data", "这是检查记录");
				retDat.add(testData1);
			}

			if (true) {
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
		SignDetailOutDataBean outData = new SignDetailOutDataBean();
		List responseWretData = responseW.getRet_data();

		if (responseW.isSuccess()) {
			try {
				Map data = (Map) responseWretData.get(0);
				outData.setTextFormat(data.get("type").toString());
				outData.setText(data.get("data").toString());
				List dataList=new ArrayList();
				dataList.add(outData);
				voResponse.setRet_code(Constains.SUCCESS_CODE);
				voResponse.setRet_msg(Constains.SUCCESS_MSG);
				voResponse.setRet_data(dataList);
				voResponse.setRet_count(1);
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
