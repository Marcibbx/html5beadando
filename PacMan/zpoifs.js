function zpoifs(pname,px,py,pmap){
	var selector = "#" + pmap + " #m";
	var neighborhood = [
		[$(selector + (px - 1) + "_" + (py - 1)).html(), $(selector + (px) + "_" + (py - 1)).html(), $(selector + (px + 1) + "_" + (py - 1)).html()],
		[$(selector + (px - 1) + "_" + (py)).html(), $(selector + (px) + "_" + (py)).html(), $(selector + (px + 1) + "_" + (py)).html()],
		[$(selector + (px - 1) + "_" + (py + 1)).html(), $(selector + (px) + "_" + (py + 1)).html(), $(selector + (px + 1) + "_" + (py + 1)).html()]
	];

	var output = "";
	var direction = 2;
	if (neighborhood[0][1] == "1") {
		direction = 0;
	}
	else if (neighborhood[1][2] == "1" || neighborhood[0][2] == "1") {
		direction = 3;
	}
	else if (neighborhood[2][1] == "1" || neighborhood[2][2] == "1") {
		direction = 2;
	}
	else if (neighborhood[1][0] == "1" || neighborhood[2][0] == "1") {
		direction = 1;
	}
	else if (neighborhood[0][0] == "1") {
		if (neighborhood[0][1] != "9") {
			direction = 0;
		} else if (neighborhood[1][0] != "9") {
			direction = 1;
		}
	}
	else if (neighborhood[0][2] == "1") {
		if (neighborhood[0][1] != "9") {
			direction = 0;
		} else if (neighborhood[1][2] != "9") {
			direction = 3;
		}
	}
	else if (neighborhood[2][2] == "1") {
		if (neighborhood[2][1] != "9") {
			direction = 2;
		} else if (neighborhood[1][2] != "9") {
			direction = 3;
		}
	}
	else if (neighborhood[2][0] == "1") {
		if (neighborhood[1][0] != "9") {
			direction = 1;
		} else if (neighborhood[2][1] != "9") {
			direction = 2;
		}
	}
	else
	{
		direction = Math.floor(Math.random()*4)
	}
	
	$("body").trigger({
   	type: "refreshmap",
       name: pname,
       walk: direction
    });
}