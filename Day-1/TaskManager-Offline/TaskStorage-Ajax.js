function taskStorage(){
	var storage = window.localStorage;
	function addTask(taskName){
		console.log("Using AJAX to save the task in the server");
	}

	function removeTask(id){
		return storage.removeItem(id);
	}

	function toggleCompletion(id){
		var task = window.JSON.parse(storage.getItem(id));
		task.isCompleted = !task.isCompleted;
		storage.setItem(id,window.JSON.stringify(task));
	}

	function getAllTasks(){
		var tasks = [];
		for(var i=0;i<storage.length;i++){
			var task = window.JSON.parse(storage.getItem(storage.key(i)));
			tasks.push(task);
		}
		return tasks;
	}
	return {
		add : addTask,
		remove : removeTask,
		getAll : getAllTasks,
		toggleCompletion : toggleCompletion
	};
}