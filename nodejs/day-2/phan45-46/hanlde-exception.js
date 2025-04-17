try {
    const a = 10;
    const b = 0;
  
    if (b === 0) {
      throw new Error("this number cannot be divided by 0");
    }
  
    const result = a / b;
    console.log(result);
  } catch (err) {
    console.error("Error:", err.message);
  }
  