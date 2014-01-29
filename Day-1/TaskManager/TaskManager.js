(function(){
	window.addEventListener("DOMContentLoaded",init);
	var btnAddTask
		, btnRemoveCompleted
		, txtTask
		, ulTaskList;

	function init(){
		ulTaskList = document.getElementById("ulTaskList");
		txtTask = document.getElementById("txtTask");
		btnAddTask = document.getElementById("btnAddTask");
		btnRemoveCompleted = document.getElementById('btnRemoveCompleted');
		btnAddTask.addEventListener("click",onBtnAddTaskClicked);
		btnRemoveCompleted.addEventListener("click",onBtnAddRemoveCompletedClicked);
	}

	function onBtnAddTaskClicked(){
		var newTask = document.createElement("li");
		newTask.innerText = txtTask.value;
		newTask.addEventListener("click",onTaskItemClicked);
		ulTaskList.appendChild(newTask);
	}

	function onTaskItemClicked(){
		if (this.classList.contains("completed")){
			this.classList.remove("completed");
		} else {
			this.classList.add("completed");
		}
	}

	function onBtnAddRemoveCompletedClicked(){
		var taskItems = ulTaskList.children;
		for(var i=taskItems.length-1;i>=0;i--){
			var taskItem = taskItems[i];
			if (taskItem.classList.contains("completed")){
				taskItem.removeEventListener("click",onTaskItemClicked);
				ulTaskList.removeChild(taskItem);
			}
		}
	}
})();