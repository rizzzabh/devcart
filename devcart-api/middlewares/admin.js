export const isAdmin = async (req, res, next) => {
try {
        if (req.user?.role !== "admin") {
          return res.status(400).json({ message: "Access denied : Admin only" });
        }
        next() ; 
} catch (error) {
      res.status(401).json({message : "Authentication of Admin failed..."}) ;
}
};
