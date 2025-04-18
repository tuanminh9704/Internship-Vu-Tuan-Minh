const tasks = [
    {
      id: '1',
      taskName: 'abc',
      deadline: '2025-04-15T23:59:00Z', 
      status: 'pending'
    },
    {
      id: '2',
      taskName: '123',
      deadline: '2025-04-20T12:00:00Z',
      status: 'pending'
    },
    {
      id: '3',
      taskName: 'xyz',
      deadline: '2025-04-10T10:00:00Z',
      status: 'pending'
    }
  ];
  


const updateOverdue = (tasks) => {
    const now = new Date();
    return tasks.map(task => {
      if (task.status !== 'completed' && new Date(task.deadline) < now) {
        task.status = 'overdue';
      }
      return task;
    });
  }
  

export const getListTask = (req, res) => {
    try {
        const updatedTask = updateOverdue(tasks);
        res.status(200).json({
            code: 200,
            data: updatedTask,
        }) 
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error,
        })
    }
}

export const createTask = (req, res) => {
    try {
        const newTask = req.body;
        if(newTask.taskName.trim() === ""){
            res.status(500).json({
                code: 500,
                message: 'Name task is invalid!'
            })
            return;
        }
        tasks.push(newTask);

        res.status(200).json({
            code: 200,
            data: tasks
        })
    } catch (error) {
       res.status(500).json({
        code: 500,
        message: error,
       }) 
    }

}

export const updateTask = (req, res) => {
    try {
        const id = req.params.id
        const updatedTaskName = req.body.taskName;
        if(updatedTaskName.trim() === "") {
            res.status(500).json({
                code: 500,
                message: 'Name task is invalid!'
            })
            return;
        }
    
        const task = tasks.find(task => task.id = id);
        task.taskName = updatedTaskName; 
        res.status(200).json({
            code: 200,
            data: updatedTaskName,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error
        }) 
    }

}

export const deleteTask = (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = tasks.filter(task => task.id !== id);
        res.status(200).json({
            code: 200,
            message: "OK"
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error
        })
    }
}