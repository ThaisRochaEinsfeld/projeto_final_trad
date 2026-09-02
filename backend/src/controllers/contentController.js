const prisma = require("../lib/prisma");

async function createContent(req, res) {
  try {
    const { title, description, categoryId } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const content = await prisma.content.create({
      data: {
        title,
        description,
        categoryId: categoryId || null,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json(content);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getContents(req, res) {
  try {
    const contents = await prisma.content.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.json(contents);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getContentById(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid content id",
      });
    }

    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    return res.json(content);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateContent(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, description, categoryId } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid content id",
      });
    }

    const existingContent = await prisma.content.findUnique({
      where: { id },
    });

    if (!existingContent) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    const content = await prisma.content.update({
      where: { id },
      data: {
        title: title ?? existingContent.title,
        description: description ?? existingContent.description,
        categoryId:
          categoryId !== undefined
            ? categoryId
            : existingContent.categoryId,
      },
      include: {
        category: true,
      },
    });

    return res.json(content);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function deleteContent(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid content id",
      });
    }

    const existingContent = await prisma.content.findUnique({
      where: { id },
    });

    if (!existingContent) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    await prisma.content.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
};