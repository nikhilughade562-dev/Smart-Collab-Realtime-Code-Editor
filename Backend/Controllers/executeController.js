const dockerService=require('../Services/dockerServices.js')

const executeCode = async (req, res) => {
    try {
        const { language, code, input = "" } = req.body;

        // Basic validation
        if (!language || !code) {
            return res.status(400).json({
                success: false,
                message: "Language and code are required."
            });
        }

        const result = await dockerService.executeCode({
            language,
            code,
            input
        });

        return res.status(200).json({
            success: true,
            output: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Execution failed."
        });
    }
};

module.exports = {
    executeCode
};