function getnewUserxyInfo(cdy) {
	if(vtimeflag == 1 || vtimeflag == 2) {
		timeflag = 2 * 3600000;
		xtimeflag = 3600000;
	} else if(vtimeflag == 3) {
		timeflag = 24 * 3600000;
		xtimeflag = 24 * 3600000;
	} else if(vtimeflag == 4) {
		timeflag = 3 * 24 * 3600000;
		xtimeflag = 24 * 3600000;
	} else {
		if(cdy > 100) {
			timeflag = 30 * 24 * 3600000;
			xtimeflag = 7 * 24 * 3600000;
		} else if(cdy > 30) {
			timeflag = 7 * 24 * 3600000;
			xtimeflag = 3 * 24 * 3600000;
		} else if(cdy == 1) {
			timeflag = 3600000;
			xtimeflag = 3600000;
		} else {
			timeflag = 7 * 24 * 3600000;
			xtimeflag = 24 * 3600000;
		}
	}
}

function gettimexyInfo(cdy) {
	if(vtimeflag <= 3) {
		timeflag = 24 * 3600000;
		xtimeflag = 24 * 3600000;
	} else if(vtimeflag == 4) {
		timeflag = 3 * 24 * 3600000;
		xtimeflag = 24 * 3600000;
	} else {
		if(cdy > 100) {
			timeflag = 30 * 24 * 3600000;
			xtimeflag = 7 * 24 * 3600000;
		} else if(cdy > 30) {
			timeflag = 7 * 24 * 3600000;
			xtimeflag = 3 * 24 * 3600000;
		} else {
			timeflag = 7 * 24 * 3600000;
			xtimeflag = 24 * 3600000;
		}
	}
}// JavaScript Document