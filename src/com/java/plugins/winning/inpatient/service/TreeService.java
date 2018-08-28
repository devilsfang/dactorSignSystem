package plugins.winning.inpatient.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.util.Constains;
import common.util.HttpRequestUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import plugins.winning.WinnigConfig;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;

public class TreeService {
	public static WinningResponse getTree(WinningRequest request) {
		WinningResponse response = new WinningResponse();

		JSONObject json = HttpRequestUtil.httpGet(WinnigConfig.getInstance().TreeUrl, request.getParam(), true);
		// String
		// retStr="{\"ret_code\":\"0000\",\"ret_msg\":\"成功\",\"ret_count\":8,\"ret_data\":[{\"IbookID\":2,\"cBookName\":\"病案首页\",\"iCaseHisId\":null},{\"IbookID\":3,\"cBookName\":\"住院记录\",\"iCaseHisId\":1419490},{\"IbookID\":4,\"cBookName\":\"病程记录\",\"iCaseHisId\":1419466},{\"IbookID\":102,\"cBookName\":\"出院
		// 记录\",\"iCaseHisId\":1419620},{\"IbookID\":102,\"cBookName\":\"出院
		// 记录\",\"iCaseHisId\":1419622},{\"IbookID\":100157,\"cBookName\":\"特殊检查、治疗同意书（卡）\",\"iCaseHisId\":1419602},{\"IbookID\":9999,\"cBookName\":\"医嘱\",\"iCaseHisId\":null},{\"IbookID\":9998,\"cBookName\":\"检查结果\",\"iCaseHisId\":null}]}";
		// JSONObject json=JSONObject.fromObject(retStr);

		if (json == null) {
			response.setRet_code(Constains.ERROR_CODE);
			response.setRet_msg("网络访问异常");
		} else {
			try {
				JSONArray ja = json.getJSONArray("ret_data");
				List<Map> data = JSONArray.toList(ja, new HashMap(), new JsonConfig());
				response = (WinningResponse) JSONObject.toBean(json, WinningResponse.class);
				response.setRet_data(data);
			} catch (Exception e) {
				response.setRet_code(Constains.ERROR_CODE);
				response.setRet_msg("HIS系统返回异常");
			}
		}

		return response;

	}
}
