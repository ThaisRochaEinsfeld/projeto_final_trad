const prisma = require("../lib/prisma");

async function getMyProgress(req, res) {
  try {
    const userId = req.user.userId;

    const progress = await prisma.progress.findMany({
      where: {
        userId,
      },
      include: {
        content: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.json(progress);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateProgress(req, res) {
  try {
    const userId = req.user.userId;
    const contentId = Number(req.params.contentId);
    const { completed } = req.body;

    if (Number.isNaN(contentId)) {
      return res.status(400).json({
        message: "Invalid content id",
      });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        message: "Completed must be a boolean",
      });
    }

    const content = await prisma.content.findUnique({
      where: {
        id: contentId,
      },
    });

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    const progress = await prisma.progress.upsert({
      where: {
        userId_contentId: {
          userId,
          contentId,
        },
      },
      update: {
        completed,
      },
      create: {
        userId,
        contentId,
        completed,
      },
    });

    return res.json(progress);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  getMyProgress,
  updateProgress,
};