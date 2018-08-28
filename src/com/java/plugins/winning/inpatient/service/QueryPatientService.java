package plugins.winning.inpatient.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.util.Constains;
import common.util.HttpRequestUtil;
import plugins.winning.WinnigConfig;
import plugins.winning.inpatient.vo.WinningRequest;
import plugins.winning.inpatient.vo.WinningResponse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

public class QueryPatientService {
	public static WinningResponse QueryPatient(WinningRequest request) {
		WinningResponse response = new WinningResponse();

		JSONObject json = HttpRequestUtil.httpGet(WinnigConfig.getInstance().QueryPatientUrl, request.getParam(), true);
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
