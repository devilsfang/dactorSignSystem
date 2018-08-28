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

public class SignOpinionFillService {
	public static WinningResponse SignOpinionFill(WinningRequest request) {
		WinningResponse response = new WinningResponse();

		JSONObject json = HttpRequestUtil.httpGet(WinnigConfig.getInstance().SignOpnionFillUrl, request.getParam(),
				true);
		if (json == null) {
			response.setRet_code(Constains.ERROR_CODE);
			response.setRet_msg("网络访问异常");
		} else {
			try {
				if (json.get("ret_code").equals("0000"))
					response.setRet_code(Constains.SUCCESS_CODE);
				else {
					response.setRet_code(json.get("ret_code").toString());
					response.setRet_msg(json.get("ret_msg").toString());
				}

			} catch (Exception e) {
				response.setRet_code(Constains.ERROR_CODE);
				response.setRet_msg("HIS系统返回异常");
			}
		}

		return response;

	}
}
