function XmlParser(docXml, meta)
{

    return read(docXml);

    function read(docXml)
    {

        if (!docXml)
        {
            throw {message: "XmlReader.read: XML Document not available"};
        }

        try {
            return readRecords(docXml);
        }
        catch(ex)
        {
            return null;
        }
    }

    function readRecords(doc)
    {
        var root = doc.documentElement;

        var ns = root.getElementsByTagName(meta.record);

        if (ns.length == 0)
        {
            return null;
        }

        var records = new Array(ns.length);

        for (var i = 0, len = ns.length; i < len; i++)
        {
            var n = ns[i];
            var item = new classMap();
            for (var j = 0; j < n.childNodes.length; j++)
            {
                if (n.childNodes[j].nodeType == 1)
                {
                    item.setAt(n.childNodes[j].tagName, n.childNodes[j].childNodes[0].data);
                }
            }
            records[i] = item;
        }
        return records;
    }
}

function GWeatherParser(docXml, meta)
{

    return read(docXml);

    function read(docXml)
    {

        if (!docXml)
        {
            throw {message: "XmlReader.read: XML Document not available"};
        }

        try {
            return readRecords(docXml);
        }
        catch(ex)
        {
            return null;
        }
    }

    function readRecords(doc)
    {
        var root = doc.documentElement;

        var ns = root.getElementsByTagName(meta.record);

        if (ns.length == 0)
        {
            return null;
        }

        var records = new Array(ns.length);

        for (var i = 0, len = ns.length; i < len; i++)
        {
            var n = ns[i];
            var item = new classMap();
            for (var j = 0; j < n.childNodes.length; j++)
            {
                if (n.childNodes[j].nodeType == 1)
                {
                    item.setAt(n.childNodes[j].tagName, n.childNodes[j].getAttribute("data"));
                }
            }
            records[i] = item;
        }
        return records;
    }
}

