
// module.exports.setError = function (stat, msg){
// 	msg = msg || "something went wrong"
// 	var err  = new Error(msg);
// 	err.status = stat || 404;
// 	return err;
// }

export default {
	setError (stat, msg){
		msg = msg || "something went wrong"
		var err  = new Error(msg);
		err.status = stat || 404;
		return err;
	}
}